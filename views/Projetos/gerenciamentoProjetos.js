import React, { useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";

//import { Component } from 'react'

const GerenciamentoProjetos = props => {
    const { useState } = React;

    const [data, setData] = useState([
    ]);

    const [enderecos, setEnderecos] = useState([
    ]);
    const [professores, setProfessores] = useState([
    ]);
    useEffect(() => {

      getEnderecos();
      getProfessores();
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
    //console.log(objectEnder)

    function getProfessores() {
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
          setProfessores(professores);
        })
        .catch(error => console.log(error));
    }
    var objectProf = professores.reduce((dados, chave) =>{
      dados[chave.id] = chave.nome;
      return dados;
    }, {});
    console.log(objectProf)
    function handleClick() {
      axios
        .get("http://demo1097703.mockable.io/getProjetos")
        .then(response => {
   
          console.log(response.data.lista);
          const projetos = response.data.lista.map(c => {
            return {
              id: c.id,
              tituloProjeto: c.tituloProjeto,
              idProfessorResponsavel: c.idProfessorResponsavel,
              areaProjeto: c.areaProjeto,
              resumo: c.resumo,
              palavraChave1:c.palavraChave1,
              palavraChave2:c.palavraChave2,
              palavraChave3:c.palavraChave3,
              url:c.url,
            };
          });
          setData(projetos);
        })
        .catch(error => console.log(error));
    }

    function handleCreate(newData) {
      axios
        .post("http://demo1097703.mockable.io/postProjetos", {//meu mock
          "id": newData.id,
          "tituloProjeto": newData.tituloProjeto,
          "idProfessorResponsavel": newData.idProfessorResponsavel,
          "areaProjeto": newData.areaProjeto,
          "resumo": newData.resumo,
          "palavraChave1":newData.palavraChave1,
          "palavraChave2":newData.palavraChave2,
          "palavraChave3":newData.palavraChave3,
          "url":newData.url,
        })
        .then(function(response){
          console.log('aluno deletado')
        });
    }

    function handleUpdate(newData) {
      axios
        .put("http://demo1097703.mockable.io/updateAluno", {
          "id": newData.id,
          "tituloProjeto": newData.tituloProjeto,
          "idProfessorResponsavel": newData.idProfessorResponsavel,
          "areaProjeto": newData.areaProjeto,
          "resumo": newData.resumo,
          "palavraChave1":newData.palavraChave1,
          "palavraChave2":newData.palavraChave2,
          "palavraChave3":newData.palavraChave3,
          "url":newData.url,
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
        title="Gerenciamento de Projetos"
        columns={[
          { title: 'Id', field: 'id' , type: 'numeric'},
          { title: 'Titulo', field: 'tituloProjeto' },
          { title: 'Professor responsável', field: 'idProfessorResponsavel', lookup: objectProf },
          { title: 'Área do projeto', field: 'areaProjeto' },
          { title: 'Palavra-Chave1', field: 'palavraChave1' },
          { title: 'Palavra-Chave2', field: 'palavraChave2' },
          { title: 'Palavra-Chave3', field: 'palavraChave3' },
          { title: 'Url_documento', field: 'url' }
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

  export default GerenciamentoProjetos;