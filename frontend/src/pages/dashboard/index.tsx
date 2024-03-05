import { Col, Container, Row } from 'react-bootstrap'
import { FolderUser } from '@phosphor-icons/react';
import SearchBar from '../../components/SearchBar';
import ClientsTable from '../../components/ClientsTable';
import { useEffect, useState } from 'react';
import { ClientesData, getClientes } from '../../utils/api/clientes';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [clientInfo, setClientInfo] = useState<ClientesData[]>([])
    const [editMode, setEditMode] = useState(false)

    const handleAddCliente = () => { setEditMode(!editMode) }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const data = await getClientes()
                if (!data.message ) {
                    setClientInfo(data.found)
                }
            } catch (e) {
                console.log(e)
            }
        }

        fetchAllData()
    }, [])

    return (
        <Container fluid>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme='dark'
                pauseOnHover
            />
            <Row>
                <div className='p-4 pb-5 flex flex-row gap-3 items-center'>
                    <FolderUser size={25} className='text-stone-50' />
                    <h1 className='text-xl text-stone-50 select-none'>Gerenciamento de Clientes</h1>
                </div>
                <Col className='bg-stone-50 rounded-t-lg m-3'>
                    <div className="flex justify-center">
                        <SearchBar />
                    </div>
                    <section>
                        <ClientsTable
                            data={clientInfo}
                            handleAdd={handleAddCliente}
                            editMode={editMode}
                        />
                    </section>
                </Col>
            </Row>
        </Container>
    )
}

export default Home