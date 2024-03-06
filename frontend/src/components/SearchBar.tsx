import { MagnifyingGlass } from '@phosphor-icons/react'
import { Container, FormControl, InputGroup } from 'react-bootstrap'

interface SearchBarProps {
  handleSearch: (query: string) => void
  queryText: string
}

function SearchBar({...props} : SearchBarProps) {
  return (
    <Container className='flex flex-row justify-center items-center m-2'>
      <InputGroup>
        <InputGroup.Text className='bg-stone-50'>
          <MagnifyingGlass size={20} className='text-stone-500' />
        </InputGroup.Text>
        <FormControl 
        placeholder='Pesquisar Cliente' 
        name="search" 
        value={props.queryText}
        onChange={(e) => props.handleSearch(e.target.value)}/>
      </InputGroup>
    </Container>
  )
}

export default SearchBar