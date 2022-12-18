import React, { useState, useEffect,forceUpdate } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { getWords } from 'hooks/getWords';
import { deleteWord } from 'hooks/deleteWord';
import { wordsData } from '../../data';
import {doc,deleteDoc} from 'firebase/firestore';
import {db} from 'lib/config/firebase.config';

export function refreshPage(){
  window.location.reload();
}
const Dashboard = () => {
  const [words, setWords] = useState(getWords);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [auxRender, setAuxRender] = useState(false);
  
  useEffect(() => {
    setWords([]);
    getWords().then((words) => words.forEach((element) => {
      setWords((old) => [...old, element])
    }));
  }, [])

  
  const handleEdit = id => {
    const [Word] = words.filter(word => word.id === id);
    setSelectedWord(Word);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Estás seguro?',
      text: "No podras revertir este cambio!",
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
    }).then(result => {
      if (result.value) {
        const [Word] = words.filter(word => word.id === id);
        deleteWord(Word.id)
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: `La palabra ${Word.data().word} ha sido eliminada con éxito  `,
          showConfirmButton: false,
          timer: 1500,
        });

        const wordsCopy = words.filter(word => word.id !== id);
        setWords(wordsCopy);
      }
    });
  };

  return (
    <div className="container">
      
      {!isAdding && !isEditing && (
        <>
        
        <Header
        
          setIsAdding={setIsAdding}
          // setIsAuthenticated={setIsAuthenticated}
        />
        
        
        
          <Table
            words={words}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          words={words}
          setWords={setWords}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          words={words}
          selectedWord={selectedWord}
          setWords={setWords}
          setIsEditing={setIsEditing}
          setEdited ={setEdited}
        />
      )}
    </div>
  );
};

export default Dashboard;
