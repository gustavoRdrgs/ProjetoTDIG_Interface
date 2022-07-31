import React, { useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoEnderecos = props => {
    const { useState, useEffect } = React;
  
    const [endereco, setEndereco] = useState();
  
    const [data, setData] = useState([]);
    const [id, setId] = useState(1);
    useEffect(() => {
      handleClick()
    }, [])

    function handleClick() {
      axios
        .get("http://demo1097703.mockable.io/getEnderecos")
        .then(response => {
          //console.log(response.data.lista);
          const endereco = response.data.lista.map(c => {
            return {
              id: c.id,
              rua: c.rua,
              numero: c.numero,
              cep: c.cep,
              cidade: c.cidade,
              estado: c.estado,
              pais: c.pais,
            };
          });
          setData(endereco);
          setEndereco(endereco);
        })
        .catch(error => console.log(error));
    }

    function handleCreate(newData) {
      let contador=2;
      axios
        .post("http://demo8657387.mockable.io/post", {
          "id": contador ,
          "rua": newData.rua,
          "numero": newData.numero,
          "cep": newData.cep,
          "cidade": newData.cidade,
          "estado": newData.estado,
          "pais": newData.pais,
        })
        .then(function(response){
          console.log(response.data)
          const enderecos = response.data.map(c => {
            return {
              id: contador ,
              rua: c.rua,
              numero: c.numero,
              cep: c.cep,
              cidade: c.cidade,
              estado: c.estado,
              pais: c.pais,
            };
          });
          setEndereco(enderecos)
          contador++
          console.log('salvo com sucesso')
        })
        .catch((e) => {
          console.log(e)
        });
    }

    function handleUpdate(newData) {
      axios
        .put("hhttp://demo8657387.mockable.io/put", {
          "id": newData.id ,
          "rua": newData.rua,
          "numero": newData.numero,
          "cep": newData.cep,
          "cidade": newData.cidade,
          "estado": newData.estado,
          "pais": newData.pais,
        })
        .then(function(response){

          console.log('atualizado com sucesso')
        });
    }
    function handleDelete(newData) {
      axios
        .delete("http://demo8657387.mockable.io/delete", {
          "id": newData.id
        })
        .then(function(response){
          console.log('deletado com sucesso')
        })
    }
    return (
      [
      //<Button id = "aew" color="primary" onClick={handleClick}>Consulta</Button>,
      <MaterialTable
        title="Gerenciamento de Enderecos"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Rua', field: 'rua'},
          { title: 'Numero', field: 'numero', type: 'numerico' },
          { title: 'CEP', field: 'cep' },
          { title: 'Cidade', field: 'cidade' },
          { title: 'Estado', field: 'estado' },
          { title: 'Pais', field: 'pais' }
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreate(newData)
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />]
    )
  }

  export default GerenciamentoEnderecos;