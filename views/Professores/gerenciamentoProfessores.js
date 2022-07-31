import { Grid, MuiThemeProvider, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";

//import { Component } from 'react'

const GerenciamentoProfessores = props => {
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
        .get("http://demo1097703.mockable.io/getProfessores")
        .then(response => {
   
          //console.log(response.data.lista);
          const professores = response.data.lista.map(c => {
            return {
              id: c.id,
              matricula: c.matricula,
              nome: c.nome,
              curso: c.curso,
              idEndereco: c.idEndereco,
            };
          });
          setData(professores);
        })
        .catch(error => console.log(error));
    }

    function handleCreate(newData) {
      axios
        .post("http://demo1097703.mockable.io/postProfessores", {//meu mock
          "id": newData.id,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "curso": newData.curso,
          "idEndereco": newData.idEndereco,
        })
        .then(function(response){
          console.log('professor deletado')
        });
    }

    function handleUpdate(newData) {
      axios
        .put("http://demo1097703.mockable.io/updateProfessor", {
          "id": newData.id,
          "matricula": newData.matricula,
          "nome": newData.nome,
          "curso": newData.curso,
          "idEndereco": newData.idEndereco,
        })
        .then(function(response){
          console.log('professor atualizado')
        });
    }

    function handleDelete(newData) {
      axios
        .delete("http://demo1097703.mockable.io/deleteProfessor", {
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
        title="Gerenciamento de Professores"
        columns={[
          { title: 'Id', field: 'id' , type: 'numeric'},
          { title: 'Matricula', field: 'matricula', type: 'numeric' },
          { title: 'Nome', field: 'nome' },
          { title: 'Curso', field: 'curso' },
          { title: 'Endereco', field: 'idEndereco' , lookup: objectEnder },
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

  export default GerenciamentoProfessores;