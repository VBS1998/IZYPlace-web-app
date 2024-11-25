import { useState } from 'react'
import { Search } from 'lucide-react'
import styles from './SearchBox.module.css'

interface SearchBoxProps {
  title: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ title, placeholder = "Search...", onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className={styles.searchBox}>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <Search className={styles.searchIcon} />
          <span className={styles.srOnly}>Search</span>
        </button>
      </form>
    </div>
  )
}