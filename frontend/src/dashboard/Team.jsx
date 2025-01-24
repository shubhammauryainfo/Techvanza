import React from 'react'
import Layout from './components/Dashlayout';
import Head from '../components/Head';
import Header from './components/Header';
import Teamtable from './components/Teamtable';
const Team = () => {

  return (
    <Layout>
      <Head title="BRH - Teams"/>
      <Header title="Teams Details"/>
        <Teamtable />
   </Layout>
  )
}

export default Team

