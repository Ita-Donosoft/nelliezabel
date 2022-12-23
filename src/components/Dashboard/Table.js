import React, { useState } from 'react';
const Table = ({ words, setWords, handleEdit, handleDelete }) => {

  
  const [ search, setSearch ] = useState("")
  const [ filtro, setFiltro ] = useState("")

  //funcion de busqueda
  const Searcher = (e) => {
    setSearch(e.target.value)
  }

  // metodo para buscar
  let results = []
  if (!search) {
      results = words
  }else{
    results = words.filter((dato) => dato.data().word.toLowerCase().includes(search.toLowerCase()) || dato.data().category.toLowerCase().includes(search.toLowerCase()))
    words= results
  }

  //metodo para filtrar por categoria
  if (!filtro) {
    results = words
  }else{
    results = words.filter((dato) => dato.data().category.toLowerCase().includes(filtro.toLowerCase()))
    words= results
  }
  const Filtrar = (e) => {
    setFiltro(e.target.value)
    // console.log(e.target.value)
  }

  
  return (
    <div className="overflow-x-auto mx-4" style={{}}>

      <div className='flex justify-content-center gap-5'>        

        <div className='grow w-16 mr-1'>           
          <input value={search} onChange={Searcher} type="text" placeholder='Buscar palabra' className='input w-full max-w-xs mt-1 ml-1' />      
        </div>

        <div className='text-end w-64 mr-1 mt-1'>
          <select 
            className='select w-full max-w-xs '
            name="filtrar" 
            id="filtrar"
            onChange={Filtrar}    
          >
            <option value="">Selecciona una categoría</option>
            <option value="Educación">Educación</option>
            <option value="Psicología">Psicología</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
      </div>


      <table className="table mt-2">
        <thead className='text-3xl '>
          <tr className=" h-[5rem] z-1 text-white mr-3">
            <th className='text-3xl text-white bg-secondaryHeader'>ID.</th>
            {/* <th>Código Serial.</th> */}
            <th className='text-3xl text-white bg-secondaryHeader'>Palabra</th>
            <th className='text-3xl text-white bg-secondaryHeader'>Descripción</th>
            <th className="text-center text-3xl text-white bg-secondaryHeader">Categoría</th>
            <th className="text-center text-3xl text-white bg-secondaryHeader">Infantil</th>
            <th colSpan={2} className="text-center text-3xl text-white bg-secondaryHeader">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {words.length > 0 ? (
            words.map((Word, i) => (
              <tr key={Word.id} className='text-2xl'>
                <td>{i + 1}</td>
                {/* <td>{Word.id}</td> */}
                <td>{Word.data().word}</td>
                <td>{Word.data().description}</td>
                <td className="text-center">{Word.data().category}</td>
                {Word.data().forAppMobile &&(
                    <td className="text-center" style={{color: '#a78bfa'}}>✓</td>
                    
                )}
                {!Word.data().forAppMobile &&(
                    <td className="text-center" style={{color: '#51437a'}}>✕</td>
                )}
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Word.id)}
                    className="btn btn-outline btn-info"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Word.id)}
                    className="btn btn-outline btn-error"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='text-3xl' colSpan={7}>No Existen Palabras</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default Table;