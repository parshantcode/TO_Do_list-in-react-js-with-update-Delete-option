import React, { useEffect, useState } from 'react';
import { GrAddCircle } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


const localdata =()=>{
  let list = localStorage.getItem("data");
  if(list){
    return JSON.parse(localStorage.getItem("data"))
  }
  else{
    return [];
  }
}


const App = () => {
  const [input,setinput] =useState("");
  const [item,setitem] =useState(localdata());
  const [togglebtn,settogglebtn] =useState(true)
  const [isedit,setisedit] =useState(null);


const removeall =()=>{
  setitem([]);
}

   const deletedata =(id)=>{
    const updateitem = item.filter((val,index)=>{
        return val.id !==id
    })
    setitem(updateitem)
   }

  const editdata =(id)=>{
     let newdata =item.find((elem)=>{
      return elem.id ===id
     })
      settogglebtn(false)
     setinput(newdata.name)
     setisedit(id)
  }


  const itemsadded =()=>{
    if(!input){
      alert("pls filled something into input box");
    }

    else if(input && !togglebtn){
      setitem(item.map((elem)=>{
        if(elem.id === isedit){
          return {...elem,name:input}
        }
        return elem;
      }))
      settogglebtn(true);
      setinput('');
      setisedit(null);
    }
    else{
      const inputdata = { id:new Date().getTime().toString(),name:input}
       setitem([...item,inputdata]);
       setinput("");
    }
  }
  useEffect(()=>{
   localStorage.setItem("data",JSON.stringify(item))
  },[item])

  return (

    

    <div className='bg-[#061525] w-[100%] h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-[400px]  h-[60px] flex'>
        <input type="text"

        value={input}
        onChange={(e)=>setinput(e.target.value)}
        className='w-[300px] h-[60px] rounded-lg indent-6 font-bold text-xl'/>
       {
        togglebtn ?  <GrAddCircle className='bg-white mt-4 ml-[-2rem] text-[1.9rem]'
        onClick={itemsadded}/>
        :<FaEdit  onClick={itemsadded} className='bg-white mt-4 ml-[-2rem] text-[1.8rem]'/>
       }
      </div>
      <div>
        {
          item.map((val)=>(
            <div className='text-white font-semibold
             bg-[#101298] w-[300px] h-[60px]
              mt-[2rem] ml-[-6rem] rounded-lg p-4 flex justify-between'>
              <h1>{val.name}</h1>
              <MdDeleteForever onClick={()=>deletedata(val.id)}/>
              < FaEdit  className='ml-[-10rem]' onClick={()=>editdata(val.id)}/>
            </div>
          ))
        }
      </div>
      <div className='bg-white w-[200px] mt-3 ml-[-3.5rem] p-2
        text-center font-extrabold rounded-full h-[40px]'>
        <button onClick={removeall}>
          Remove all
        </button>
      </div>
      </div>
  )
}

export default App