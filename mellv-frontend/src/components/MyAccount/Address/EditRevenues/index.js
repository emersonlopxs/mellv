import React, { useEffect, useState } from 'react';
import {
  Title,
  StyledForm,
  StyledInput,
  SubmitButton,
} from './styles.module.scss';
import api from '../../../../api';
function EditRevenues({ setActive, setSectionName }) {
  const [values, setValues] = useState({
    cep: '',
    street: '',
    district: '',
    number: '',
    complement: '',
  });

  useEffect(() => {
    setSectionName('Endereços');
    setActive(3);
    async function getAddress() {
      try {
        await api
          .get('/address', {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => {
            setValues(response.data[0]);
          });
      } catch (error) {
        console.log('error ->', error.status);
      }
    }
    getAddress();
  }, [setActive, setSectionName]);

  // function retriveData(data) {
  //   setValues((e) => ({ ...e, cep: data.cep }));
  //   setValues((e) => ({ ...e, street: data.street }));
  //   setValues((e) => ({ ...e, district: data.district }));
  //   setValues((e) => ({ ...e, number: data.number }));
  //   setValues((e) => ({ ...e, complement: data.complement }));
  // }

  async function handleSubmit() {
    const data = {
      cep: values.cep,
      street: values.street,
      district: values.district,
      number: values.number,
      complement: values.complement,
    };
    console.log(data);

    // try {
    //   await api
    //     .put('/address', data, {
    //       headers: {
    //         'x-access-token': localStorage.getItem('token'),
    //       },
    //     })
    //     .then((response) => console.log(response.data));
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <h3 className={Title}>Endereço de faturamento</h3>
      <form className={StyledForm} onSubmit={handleSubmit}>
        <div>
          <label>
            CEP <span>*</span>
          </label>
          <input
            value={values.cep}
            type="number"
            onChange={(e) => setValues({ ...values, cep: e.target.value })}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Rua <span>*</span>
          </label>
          <input
            value={values.street}
            type="text"
            onChange={(e) => setValues({ ...values, street: e.target.value })}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Bairro <span>*</span>
          </label>
          <input
            value={values.district}
            type="text"
            onChange={(e) => setValues({ ...values, district: e.target.value })}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Número <span>*</span>
          </label>
          <input
            value={values.number}
            type="number"
            onChange={(e) => setValues({ ...values, number: e.target.value })}
            className={StyledInput}
          />
        </div>
        <div>
          <label>Complemento (opicional)</label>
          <input
            value={values.complement}
            type="text"
            onChange={(e) =>
              setValues({ ...values, complement: e.target.value })
            }
            className={StyledInput}
          />
        </div>
        <button type="submit" className={SubmitButton}>
          Salvar Endereços
        </button>
      </form>
    </>
  );
}

export default EditRevenues;
