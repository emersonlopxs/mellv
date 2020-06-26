const connection = require('../../database/connection')

module.exports = {
  async index(req, res) {
    const cli_id = req.cli_id
    const test = []
    let same = [], order, order_det
    try {
      order = await connection('order')
        .join('address', 'order.address_id', 'address.id')
        .select([
          'address.street',
          'address.district',
          'address.number',
          'address.complement',
          'order.id',
          'order.cupon_id',
          'order.total_price',
          'order.status',
          'order.note'
        ]).where('order.cli_id', cli_id)
    }
    catch (err) {
      return res.json({
        status: 'could not select order instance in database',
        err
      })
    }

    const id = order.map(e => e.id)

    try {
      order_det = await connection('order_det').select('*').whereIn('order_id', id)
    }
    catch (err) {
      res.json({
        status: 'could not select order details instance in database',
        err
      })
    }
    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < order_det.length; j++) {
        if (order[i].id === order_det[j].order_id) {
          same.push({ product_id: order_det[j].product_id, amount: order_det[j].amount })
        }
      }
      order[i].details = same
      same = []
    }
    res.json(order)
  },

  async create(req, res) {
    const cli_id = req.cli_id
    const { cupon_id, address_id, details, note, status } = req.body

    const productsArray = [], amountOrderArray = [], restArray = [], amountProductsArray = []
    let total_price = 0;
    let amountPriceArray, order, order_det /* tables */


    details.forEach(det => {
      /* integer array */
      productsArray.push(det.product_id)
      amountOrderArray.push(det.amount)
    });
    //console.log(productsArray);
    

    /* Price Calculator */
    try {
      amountPriceArray = await connection('products').select('price', 'amount').whereIn('id ', productsArray)

    }
    catch (err) {
      return res.json({
        status: 'could not select products instance in database with the id provided in details.product_id',
        err
      })
    }
    for (let i = 0; i < amountPriceArray.length; i++) {
      total_price += (amountPriceArray[i].price * amountOrderArray[i])
      restArray.push({ amount: (amountPriceArray[i].amount - amountOrderArray[i]) })
      amountProductsArray.push(amountPriceArray[i].amount)
      //console.log('Oq tem: ', amountPriceArray[i].amount, '/ Qnt eu quero: ',amountOrderArray[i], '/ resto:', restArray[i]);
    }
    /* sistema de estoque */

    try {
      await connection.transaction(trx => {
        const queries = []
        restArray.forEach((rest, index) => {
          const query = connection('products').update(rest).where('id', productsArray[index]).transacting(trx)
          queries.push(query);
        })
        Promise.all(queries)
          .then(trx.commit)
          .catch(trx.rollback);
      })
    }
    catch (err) {
      res.json({
        status: 'error to update the stock of itens in order_details table',
        err
      })
    }

    /* Validadion cupon area */
    /* if(cupon_id!= null){
        try{
        const discount = await connection('cupon').select('discount').where('id', cupon_id)
        total_price*=discount
        }
        catch(err){
            res.json({
                status: 'Cupon not find',
                err
            })
        }
    }  */
    try {
      [order] = await connection('order').insert({
        cli_id,
        cupon_id,
        address_id,
        total_price,
        note,
        status
      }).returning('*')
    }
    catch (err) {
      return res.json({
        status: 'could not insert order instance in database',
        err
      })
    }

    details.map(e => Object.assign(e, { order_id: order.id }))

    try {
      order_det = await connection('order_det').insert(details).returning('*')
    }
    catch (err) {
      return res.json({
        status: 'could not insert order details in database',
        err
      })
    }

    return res.status(201).json({ order, order_det })
  },
  async delete(req, res) {
    const cli_id = req.cli_id
    const id = req.params.order_id
    try {
      await connection('order').where({ cli_id, id }).del()
      return res.status(204).send()
    }
    catch (err) {
      return res.json({
        status: 'could not delete order in database',
        err
      })
    }
  }
}