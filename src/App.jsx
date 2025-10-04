import { Button, Divider, Empty, Form, Input, Modal } from 'antd';
import { Edit2, File, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNote } from './zustand/useNote';
import { nanoid } from 'nanoid';
import moment from 'moment';


export default function App() {
  const [open, setOpen] = useState(false);
  const [resetForm] = Form.useForm();
  const { notes, setNotes, deleteNotes, updateNotes } = useNote();
  const [read, setRead] = useState(null);
  const [editId, setEditId] = useState(null)

  function handleClose() {
    setOpen(false)
    resetForm.resetFields();
    setEditId(null)



  }

  function createNotes(values) {
    const newNote = { ...values, id: nanoid(), date: new Date() };
    setNotes(newNote)
    handleClose();

  }

  const removeNotes = (id) => {
    deleteNotes(id);
    setRead(null)
  }

  const editNote = (item) => {
    setOpen(true)
    resetForm.setFieldsValue(item)
    setEditId(item.id)
    setRead(item)
    console.log(item.id);
    

  }

  const saveNote = (values) => {
    const updatedNote = { ...values, id: editId, date: new Date() };
    values.date = new Date();
    updateNotes(editId, updatedNote)
    setRead(updatedNote)
    handleClose()
  }

  return (
    <div style={{
    // width: '360px',
    // height: '600px',
    // display: 'flex',
  }}>
    <div
    
     className='min-h-screen w-full bg-gray-200 md:flex'>
      <div className='h-screen lg:w-2/12 md:w-4/12 sm:w-full'>
        <aside className=' md:bg-white px-2 py-4 space-y-3 flex flex-col overflow-hidden h-full' >
          <div className='text-black/80  py-4 rounded-xl h-full overflow-hidden'>
            <div className='h-full overflow-y-auto'>
              {
                notes.map((item, index) => (
                  <div onClick={() => setRead(item)} key={index} className='my-2 flex px-2 items-center gap-1 hover:bg-rose-300 rounded-xl hover:p-2 duration-300 w-full hover:cursor-pointer bg-amber-200'>
                    <File className='md:w-6 md:h-6 w-8 h-8 ' />
                    <div className='flex flex-col mt-2 w-full'>
                      <label htmlFor="file" className='text-black/80 font-semibold capitalize text-left hover:cursor-pointer h-7 overflow-hidden'  >{item.filename}</label>
                      <div className='text-gray-500 lg:hidden md:hidden text-left flex justify-between' >
                        <p className='w-full h-2 '>
                          {item.content.length < 20 ? item.content : item.content.substring(0, 20)+"..."}
                        </p>
                        <div className='space-x-2 flex'>
                          <button onClick={(e) =>{e.stopPropagation(); editNote(item)}} className='p-3 text-white bg-green-600 hover:bg-green-500 hover:scale-105 transition-transform duration-300 rounded-xl'>
                            <Edit2 className='w-3 h-3' />
                          </button>
                          <button onClick={(e) =>{e.stopPropagation(); removeNotes(item.id)}} className='p-3 text-white bg-red-600 hover:bg-red-500 hover:scale-105 transition-transform duration-300 rounded-xl'>
                            <Trash2 className='w-3 h-3' />
                          </button>
                        </div>

                      </div>
                      <label htmlFor="data" className='text-gray-600 text-xs text-right hover:cursor-pointer '>{moment(item.date).format('DD MM YY, hh:mm A')}</label>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <button onClick={() => setOpen(true)} className=' bg-rose-600 flex justify-center items-center px-4  py-2 rounded-xl text-white font-semibold mx-auto hover:scale-105 transition-transform duration-300 hover:cursor-pointer'>
            <Plus />
            New add
          </button>
        </aside>
      </div>
      <section className=' md:block hidden flex-1  p-4 overflow-y-auto'>
        {
          read ? <div className='mx-auto bg-white rounded-2xl'>
            <div className='p-8 border-b border-gray-300 flex justify-between content-center'>

              <div>
                <h1 className='text-lg font-semibold'>{read.filename}</h1>
                <label htmlFor="calender" className='text-gray-500 text-xs'>{moment(read.date).format("dd mm yy, hh:mm a")}</label>
              </div>
              <div className='space-x-3'>
                <button onClick={() => editNote(read)} className='p-2 text-white bg-green-600 hover:bg-green-500 hover:scale-105 transition-transform duration-300 rounded-xl'>
                  <Edit2 className='w-3 h-3' />
                </button>
                <button onClick={() => removeNotes(read.id)} className='p-2 text-white bg-red-600 hover:bg-red-500 hover:scale-105 transition-transform duration-300 rounded-xl'>
                  <Trash2 className='w-3 h-3' />
                </button>

              </div>
            </div>
            <div className='p-6'>
              <p className='text-gray-500'>{read.content}</p>
            </div>
          </div> : <div className='mx-auto bg-white rounded-2xl p-4'>
            <Empty description="Choose files" />
          </div>
        }

      </section>
      <Modal open={open} onCancel={handleClose} footer={null} width={'80%'} maskClosable={false}>
        <h1>Add content here</h1>
        <Divider />
        <Form layout='vertical' onFinish={editId ? saveNote : createNotes} form={resetForm} >
          <Form.Item
            label="Filename"
            name='filename'
            rules={[{ required: true }]}
          >
            <Input placeholder='Enter title' />
          </Form.Item>
          <Form.Item
            label="Content"
            name='content'
            rules={[{ required: true }]}
          >
            <Input.TextArea size='large' rows={5} placeholder='Enter content here' />
          </Form.Item>
          <Form.Item >
            {
              editId ?
                <Button size='large' type='primary' htmlType='submit' danger>Save</Button>
                : <Button size='large' type='primary' htmlType='submit' >Submit</Button>
            }
          </Form.Item>

        </Form>
      </Modal>
    </div>
    </div>
  )
}
