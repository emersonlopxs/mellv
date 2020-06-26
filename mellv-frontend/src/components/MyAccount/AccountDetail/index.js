import React, { useEffect, useState } from 'react';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  InputGroup,
} from './styles.module.scss';
import api from '../../../api';

function AccountDetail({ setSectionName, setActive }) {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    displayname: '',
    email: '',
  });
  useEffect(() => {
    setSectionName('Detalhes da Conta');
    setActive(4);
    async function getMyAccount() {
      try {
        api
          .get('clients/profile', {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => {
            setValues(response.data[0]);
          });
      } catch (error) {
        console.log('Error ->', error);
      }
    }
    getMyAccount();
  }, [setSectionName, setActive]);

  async function handleSubmit() {
    const data = {
      name: values.name,
      surname: values.surname,
      displayname: values.displayname,
      email: values.email,
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
      <form className={StyledForm} onSubmit={handleSubmit}>
        <div className={InputGroup}>
          <div>
            <label>
              Nome <span>*</span>
            </label>
            <input
              value={values.name}
              type="text"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className={StyledInput}
            />
          </div>
          <div>
            <label>
              Sobrenome <span>*</span>
            </label>
            <input
              value={values.surname}
              type="text"
              onChange={(e) =>
                setValues({ ...values, surname: e.target.value })
              }
              className={StyledInput}
            />
          </div>
        </div>
        <div>
          <label>
            Nome de exibição <span>*</span>
          </label>
          <input
            value={values.displayname}
            type="text"
            onChange={(e) =>
              setValues({ ...values, displayname: e.target.value })
            }
            className={StyledInput}
          />
          <p>
            Será assim que seu nome será exibido na seção da conta e nos
            comentários
          </p>
        </div>
        <div>
          <label>
            Endereço de e-mail <span>*</span>
          </label>
          <input
            value={values.email}
            type="text"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={StyledInput}
          />
        </div>
        <button type="submit" className={SubmitButton}>
          Salvar Alterações
        </button>
      </form>
    </>
  );
}

export default AccountDetail;
