import React, { useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";

//import { Component } from 'react'

const GerenciamentoAlunos = props => {
    const { useState } = React;

    const [data, setData] = useState([
    ]);

    const [enderecos, setEnderecos] = useState([
    ]);

    useEffect(() => {

      getEnderecos();
      handleClick();
    }, []);

    
    function getEnderecos() {
      axios
        .get("http://demo1097703.mockable.io/getEnderecos")
        .then(response => {
   
          console.log(response.data.lista);
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
          setEnderecos(endereco);
        })
        .catch(error => console.log(error));
    }

    var objectEnder = enderecos.reduce((dados, chave) =>{
      dados[chave.id] = chave.cep;
      return dados;
    }, {});
    console.log(objectEnder)

    function handleClick() {
      axios
        .get("http://demo1097703.mockable.io/getAlunos")
        .then(response => {
   
          console.log(response.data.lista);
          const alunos = response.data.lista.map(c => {
            return {
              id: c.id,
              cpf: c.cpf,
              matricula: c.matricula,
              nome: c.nome,
              idEndereco: c.idEndereco,
              curso: c.curso
            };
          });
          setData(alunos);
        })
        .catch(error => console.log(error));
    }

    function handleCreate(newData) {
      axios
        .post("hhttp://demo1097703.mockable.io/postAlunos", {//meu mock
          "id": newData.id,
          "cpf": newData.cpf,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "idEndereco": newData.idEndereco,
          "curso": newData.curso
        })
        .then(function(response){
          console.log('aluno deletado')
        });
    }

    function handleUpdate(newData) {
      axios
        .put("http://demo1097703.mockable.io/updateAluno", {
          "id": newData.id,
          "cpf": newData.cpf,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "idEndereco": newData.idEndereco,
          "curso": newData.curso
        })
        .then(function(response){
          console.log('aluno deletado')
        });
    }

    function handleDelete(newData) {
      axios
        .delete("http://demo1097703.mockable.io/deleteAluno", {
          "id": newData.id
        })
        .then(function(response){
          console.log('removido com sucesso')
        });
    }

    return (
      [
      //<Button id = "aew" color="primary" onClick={handleClick}>Consulta</Button>,
      <MaterialTable
        title="Gerenciamento de Alunos"
        columns={[
          { title: 'Id', field: 'id' , type: 'numeric'},
          { title: 'CPF', field: 'cpf' },
          { title: 'Matricula', field: 'matricula', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'Endereco', field: 'idEndereco' , lookup: objectEnder },
          { title: 'Curso', field: 'curso' }
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
                handleUpdate(newData)
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
                handleDelete(oldData)
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

  export default GerenciamentoAlunos;