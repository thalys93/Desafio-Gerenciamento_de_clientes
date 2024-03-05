import { Hash, List } from '@phosphor-icons/react';
import { Form, FormControl, OverlayTrigger, Popover, Spinner, Table } from 'react-bootstrap';
import { ClientesData, deleteClientes, postClientes, putClientes } from '../utils/api/clientes';
import { Plus } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState } from 'react';

import * as formik from 'formik';
import * as yup from 'yup';


interface TableProps {
    data: ClientesData[]
    handleAdd: () => void
    editMode: boolean
}

interface FormProps {
    email: string;
    nome: string;
    telefone: string;
    coordenada_x: string;
    coordenada_y: string;
}

function ClientsTable({ ...props }: TableProps) {
    const { Formik } = formik;

    const [selectedID, setSelectedID] = useState<string>('')
    const [alterID, setAlterID] = useState<string>('')

    const newClient = yup.object().shape({
        email: yup.string().email('Email inválido').required('Campo obrigatório'),
        nome: yup.string().required('Campo obrigatório'),
        telefone: yup.string().required('Campo obrigatório'),
        coordenada_x: yup.string().required('Campo obrigatório'),
        coordenada_y: yup.string().required('Campo obrigatório'),
    })

    const [isLoading, setIsLoading] = useState(false)
    const [editIndex, setEditIndex] = useState<number>(0);

    const handleShowPopover = (id: string) => {
        setAlterID(id)
    }

    const handleSetEdit = (index: number) => {
        setEditIndex(index)
        setSelectedID(props.data[index].cliente_id as string)
    }

    const handleSubmit = async (values: FormProps) => {
        const UUID = uuidv4()
        setIsLoading(true)

        const formValues = {
            cliente_id: UUID,
            email: values.email,
            nome: values.nome,
            telefone: values.telefone,
            coordenada_x: values.coordenada_x,
            coordenada_y: values.coordenada_y
        }

        try {
            const res = await toast.promise(
                postClientes(formValues),
                {
                    pending: 'Cadastrando cliente...',
                    success: 'Cliente cadastrado com sucesso!',
                    error: 'Erro ao cadastrar cliente. Tente novamente mais tarde.',
                }
            )

            if (res.status === 201) {
                window.location.reload()
            } else {
                console.log('Erro ao cadastrar cliente')
            }

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const initialValues: FormProps = {
        email: '',
        nome: '',
        telefone: '',
        coordenada_x: '',
        coordenada_y: ''
    }

    const handleUpdate = async (values: FormProps,) => {
        setIsLoading(true)
        try {
            const res = await toast.promise(
                putClientes(selectedID, values),
                {
                    pending: 'Atualizando cliente...',
                    success: 'Cliente atualizado com sucesso!',
                    error: 'Erro ao atualizar cliente. Tente novamente mais tarde.',
                }
            )

            if (res.status === 200) {
                window.location.reload()
            } else {
                console.log('Erro ao atualizar cliente')
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setIsLoading(true)
        try {
            const res = await toast.promise(
                deleteClientes(id),
                {
                    pending: 'Excluindo cliente...',
                    success: 'Cliente excluído com sucesso!',
                    error: 'Erro ao excluir cliente. Tente novamente mais tarde.',
                }
            )

            if (res.status === 200) {
                window.location.reload()
            } else {
                console.log('Erro ao excluir cliente')
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const popoverOverlay = (
        <Popover>
            <Popover.Header as="h3">Atenção</Popover.Header>
            <Popover.Body>
                Você tem certeza que deseja excluir este cliente?
                <div className='flex flex-row gap-3 mt-3 mb-2'>
                    <button onClick={() => handleDelete(alterID)} className='bg-rose-500 p-2 text-stone-50 rounded w-[4rem] hover:bg-rose-300 transition-all'>
                        Sim
                    </button>
                </div>
                <span className='text-sm text-stone-300 select-none'> ID: {alterID} </span>
            </Popover.Body>
        </Popover>
    )


    const submissionForm = <Formik validationSchema={newClient} onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, errors, handleReset }) => (
            <>
                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem] w-[2rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Form.Control
                                type="text"                                
                                value={"#"}
                                plaintext                                           
                                disabled                                                     
                                className='border-[1px] border-stone-50 rounded p-2' />                      
                        </div>
                    </div>
                </td>
                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                plaintext
                                placeholder='Cliente ltda.'
                                onChange={handleChange}
                                isInvalid={!!errors.nome && touched.nome}
                                className='border-[1px] border-stone-200 rounded p-2' />
                            {touched.nome && (
                                <span className="text-rose-500 animate__animated animate__fadeInDown">{errors.nome}</span>
                            )}
                        </div>
                    </div>
                </td>
                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                placeholder='empresa@conta.com'
                                plaintext
                                onChange={handleChange}
                                isInvalid={!!errors.email && touched.email}
                                className='border-[1px] border-stone-200 rounded p-2' />
                            {touched.email && (
                                <span className="text-rose-500 animate__animated animate__fadeInDown">{errors.email}</span>
                            )}
                        </div>
                    </div>
                </td>

                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <Form.Control
                                type="text"
                                name="telefone"
                                plaintext
                                value={values.telefone}
                                placeholder='55 9999-9999'
                                onChange={handleChange}
                                isInvalid={!!errors.telefone && touched.telefone}
                                className='border-[1px] border-stone-200 rounded p-2' />
                            {touched.telefone && (
                                <span className="text-rose-500 animate__animated animate__fadeInDown">{errors.telefone}</span>
                            )}
                        </div>
                    </div>
                </td>

                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <FormControl
                                type="number"
                                name="coordenada_x"
                                value={values.coordenada_x}
                                onChange={handleChange}
                                plaintext
                                isInvalid={!!errors.coordenada_x && touched.coordenada_x}
                                className='border-[1px] border-stone-200 rounded p-2' />
                            {touched.coordenada_x && (
                                <span>{errors.coordenada_x}</span>
                            )}
                        </div>
                    </div>
                </td>

                <td>
                    <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <FormControl
                                type="number"
                                name="coordenada_y"
                                value={values.coordenada_y}
                                onChange={handleChange}
                                plaintext
                                isInvalid={!!errors.coordenada_y && touched.coordenada_y}
                                className='border-[1px] border-stone-200 rounded p-2' />
                            {touched.coordenada_y && (
                                <span>{errors.coordenada_y}</span>
                            )}
                        </div>
                    </div>
                </td>

                <td>
                    <div className='flex flex-row gap-3 items-center h-[5rem]'>
                        <button className='bg-emerald-500 text-stone-50 p-2 rounded-md w-[6rem] hover:bg-emerald-300 transition-all' onClick={() => handleSubmit()} type="submit">
                            {!isLoading ? (
                                "Cadastrar"
                            ) : (
                                <Spinner animation="border" variant="light" size="sm" />
                            )}
                        </button>
                        <button className='bg-rose-500 text-stone-50 p-2 rounded-md w-[6rem] hover:bg-rose-300 transition-all' onClick={() => handleReset()}>Cancelar</button>
                    </div>
                </td>
            </>
        )}
    </Formik>;

    const renderEditForm = (index: number) => {
        if (editIndex === index) {
            return editTableRow();
        }
        return null;
    }

    const editTableRow = () => (
        <Formik validationSchema={newClient} onSubmit={handleUpdate} initialValues={
            {
                email: props.data[editIndex].email,
                nome: props.data[editIndex].nome,
                telefone: props.data[editIndex].telefone,
                coordenada_x: props.data[editIndex].coordenada_x,
                coordenada_y: props.data[editIndex].coordenada_y
            }
        }>
            {({ handleSubmit, handleChange, values }) => (
                <>
                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem] w-[2rem]'}>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Form.Control
                                    type="text"
                                    value={editIndex + 1}
                                    plaintext
                                    disabled
                                    onChange={handleChange}
                                    className='border-[1px] border-stone-50 rounded p-2 select-none'
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    plaintext
                                    onChange={handleChange}
                                    className='border-[1px] border-stone-200 rounded p-2'
                                />
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                plaintext
                                onChange={handleChange}
                                className='border-[1px] border-stone-200 rounded p-2'
                            />
                        </div>
                    </td>

                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={values.telefone}
                                plaintext
                                onChange={handleChange}
                                className='border-[1px] border-stone-200 rounded p-2'
                            />
                        </div>
                    </td>

                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                            <Form.Control
                                type="text"
                                name="coordenada_x"
                                value={values.coordenada_x}
                                plaintext
                                onChange={handleChange}
                                className='border-[1px] border-stone-200 rounded p-2'
                            />
                        </div>
                    </td>

                    <td>
                        <div className={'flex flex-row justify-center items-center h-[5rem]'}>
                            <Form.Control
                                type="text"
                                name="coordenada_y"
                                value={values.coordenada_y}
                                plaintext
                                onChange={handleChange}
                                className='border-[1px] border-stone-200 rounded p-2'
                            />
                        </div>
                    </td>

                    <td>
                        <div className='flex flex-row gap-3 items-center h-[5rem]'>
                            <button className='bg-emerald-500 text-stone-50 p-2 rounded-md w-[6rem] hover:bg-emerald-300 transition-all' onClick={() => handleSubmit()} type="submit">
                                {!isLoading ? (
                                    "Atualizar"
                                ) : (
                                    <Spinner animation="border" variant="light" size="sm" />
                                )}
                            </button>
                            <button className='bg-rose-500 text-stone-50 p-2 rounded-md w-[6rem] hover:bg-rose-300 transition-all' onClick={() => setSelectedID('')}>Cancelar</button>
                        </div>
                    </td>
                </>
            )}
        </Formik>
    )


    return (
        <>
            <Table responsive>
                <thead className='select-none'>
                    <tr>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <Hash />
                                ID
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Nome
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Email
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Telefone
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Cordenada X
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Cordenada Y
                            </div>
                        </th>
                        <th>
                            <div className='flex flex-row gap-2 items-center'>
                                <List />
                                Ações
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.data?.length === 0 ? (
                        <tr>
                            {!props.editMode ? (
                                <td colSpan={6}>
                                    <div className='flex flex-row justify-center items-center h-[5rem]'>
                                        <span className='text-stone-400 font-light'>
                                            Nenhum cliente cadastrado
                                        </span>
                                    </div>
                                </td>
                            ) : (
                                submissionForm
                            )}
                        </tr>
                    ) : (
                        <tr>
                            {props.editMode ? (
                                submissionForm
                            ) : null
                            }
                        </tr>
                    )}
                    {props.data?.map((cliente, i) => (
                        <>
                            <tr key={i}>
                                {selectedID === cliente.cliente_id ? (
                                    renderEditForm(i)
                                ) : (
                                    <>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem] w-[2rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={i + 1}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={cliente.nome}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={cliente.email}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={cliente.telefone}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={cliente.coordenada_x}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row items-center justify-center h-[5rem]'>
                                                <div className='flex flex-row justify-center items-center gap-2'>
                                                    <Form.Control
                                                        type="text"
                                                        value={cliente.coordenada_y}
                                                        plaintext
                                                        disabled
                                                        className='border-[1px] border-stone-50 text-stone-400 rounded p-2' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row gap-3 items-center h-[5rem]'>
                                                <button className='bg-sky-500 text-stone-50 p-2  w-[6rem] rounded-md hover:bg-sky-300 transition-all' onClick={() => handleSetEdit(i)}>Editar</button>
                                                <OverlayTrigger trigger="click" placement='top' overlay={popoverOverlay}>
                                                    <button className='bg-rose-500 text-stone-50 p-2 w-[6rem] rounded-md hover:bg-rose-300 transition-all' onClick={() => handleShowPopover(cliente.cliente_id as never)}>Excluir</button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
            <button className='flex flex-row gap-1 items-center bg-sky-500 text-stone-50 p-2 rounded-md hover:bg-sky-300 transition-all m-2' onClick={() => props.handleAdd()}>
                <Plus className='text-stone-50' weight='bold' size={20} /> Adicionar Cliente
            </button>
        </>
    )
}

export default ClientsTable