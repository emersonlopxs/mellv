import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CamaleaoTableFull({
  products,
  setActive,
  deleteProduct,
}) {
  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Id', field: 'id' },
      { title: 'Descrição', field: 'description' },
      { title: 'Preço', field: 'price', type: 'numeric' },
      // { title: 'Imagem', field: 'imagem' },
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      // },
    ],
    data: products,
  });

  useEffect(() => {
    setState((oldState) => ({ ...oldState, data: products }));
    console.log('table!');
  }, [products]);

  return (
    <MaterialTable
      width="100%"
      title="Produtos"
      columns={state.columns}
      data={state.data}
      // components={{
      //   Action: (props) => (
      //     <button
      //       onClick={(event) => props.action.onClick(event, props.data)}
      //       color="primary"
      //       variant="contained"
      //       style={{ textTransform: 'none' }}
      //       size="small">
      //       My Button
      //     </button>
      //   ),
      // }}
      actions={[
        {
          icon: EditIcon,
          tooltip: 'Editar Produto',
          onClick: (event, product) => {
            localStorage.setItem('ProductEdit', JSON.stringify(product));
            setActive(2);
          },
        },
        {
          icon: DeleteIcon,
          tooltip: 'Apagar Produto',
          onClick: (event, product) => {
            deleteProduct(
              window.confirm(`Deseja deletar o produto ${product.name}`),
              product.id
            );
          },
        },
      ]}
      // editable={{
      // onRowAdd: (newData) =>
      //   new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve();
      //       setState((prevState) => {
      //         const data = [...prevState.data];
      //         data.push(newData);
      //         return { ...prevState, data };
      //       });
      //     }, 600);
      //   }),
      // onRowUpdate: (newData, oldData) =>{
      //   console.log('old data!?', oldData)
      // },
      // onRowDelete: (oldData) =>
      //   new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve();
      //       setState((prevState) => {
      //         const data = [...prevState.data];
      //         data.splice(data.indexOf(oldData), 1);
      //         return { ...prevState, data };
      //       });
      //     }, 600);
      //   }),
      // }}
    />
  );
}
