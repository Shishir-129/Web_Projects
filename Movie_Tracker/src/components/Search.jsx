import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input type="text" placeholder="Search Movies" value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)} /> {/* onChange event handler to update searchTerm state in App component(parent) */}

        </div>    
    </div>
  )
}

export default Search
