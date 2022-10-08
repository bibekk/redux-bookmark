import React, { createRef, useState, useEffect } from "react"
import "../App.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchBMCat } from "../actions/action-cat"
import { deleteBM, fetchBMByCat, errorAfterFiveSeconds, editBM, updateBM, cancelEdit, searchData, cleanSearch } from "../actions/action-bm"
import { fetchTermsFromDB } from "../actions/action-terms"

import Categorymenu from "../components/categorymenu"
import Bookmarkslist from "../components/bookmarkslist"

import AddBookmarks from "../components/addbookmark"
import Managecat from "./managecat"
import Manageterms from "./manageterms"

import Search from "./search"
import { Grid, Button, Input } from "semantic-ui-react"

const Home = (props) => {
  const {
    cat,
    fetchBMByCat,
    fetchBMCat,
    fetchTermsFromDB,
    items,
    search,
    activeCategory,
    deleteBM,
    editBM,
    updateBM,
    cancelEdit,
    searchData,
    cleanSearch,
  } = props
  const [openBM, setOpenBM] = useState(false)
  const [openCat, setOpenCat] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  const [searchText, setSearchText] = useState("")
  let searchRef = createRef()

  useEffect(() => {
    fetchBMByCat()
    fetchBMCat()
    fetchTermsFromDB()
  }, [fetchBMByCat, fetchBMCat, fetchTermsFromDB])

  const clearSearch = () => {
    setSearchText("")
    cleanSearch()
    document.querySelector("input").value = ""
  }

  const searchBM = (e, v) => {
    setSearchText(v.value)
    if (v.value.length > 2) {
      searchData(v.value)
    }
    if (v.value.length === 0) {
      cleanSearch()
    }
  }

  const download = () => {
    fetch("http://localhost:8080/bookmark/getAllBookmarks").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement("a")
        a.href = url
        a.download = "bookmarks.csv"
        a.click()
      })
    })

    fetch("http://localhost:8080/bookmark/getAllCategories").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement("a")
        a.href = url
        a.download = "categories.csv"
        a.click()
      })
    })
  }
  return (
    <Grid>
      <Grid.Row>
        {/*isLoading &&
          <Message content='Loading...' />
        */}
        <Grid.Column width={16}>
          <Button.Group basic>
            <Button icon="add" onClick={() => setOpenBM(true)} content="Add" />
            <Button icon="list alternate outline" onClick={() => setOpenCat(true)} content="Category" />
            <Button icon="clipboard list" onClick={() => setOpenTerms(true)} content="Terms" />
            <Button icon="database" onClick={download} content="Backup" />
          </Button.Group>
          &nbsp;
          <Input icon="search" placeholder="Search Text" onChange={searchBM} ref={searchRef} />
          &nbsp;
          {searchText !== '' ? (
            <Button basic color="green" onClick={clearSearch}>
              Clear
            </Button>
          ) : null}
          &nbsp;
        </Grid.Column>
        <AddBookmarks open={openBM} close={() => setOpenBM(false)} />
        <Managecat open={openCat} close={() => setOpenCat(false)} />
        <Manageterms open={openTerms} close={() => setOpenTerms(false)} />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={1}>
          <Categorymenu
            data={cat}
            filterBlogCallback={fetchBMByCat}
            rank={'first'}
            activeCategory={activeCategory}
            updateBM={updateBM}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Categorymenu
            
            data={cat}
            filterBlogCallback={fetchBMByCat}
            rank={'second'}
            activeCategory={activeCategory}
            updateBM={updateBM}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          {search.length === 0 && (
            <Bookmarkslist
              cat={cat}
              items={items}
              deleteBM={deleteBM}
              editBM={editBM}
              updateBM={updateBM}
              cancelEdit={cancelEdit}
              filterBlogCallback={fetchBMByCat}
            />
          )}
          {search.length > 0 && <Search />}
        </Grid.Column>
        <Grid.Column width={1}>
          <Categorymenu
            
            data={cat}
            filterBlogCallback={fetchBMByCat}
            rank={'third'}
            activeCategory={activeCategory}
            updateBM={updateBM}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Categorymenu
            
            data={cat}
            filterBlogCallback={fetchBMByCat}
            rank={'fourth'}
            activeCategory={activeCategory}
            updateBM={updateBM}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    cat: state.categories,//.filter((f) => f.parent_cat_id === null),
    activeCategory: state.activeCategory,
    cat_heir: state.cat_heir
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
     // fetchCategoryHierarchy: fetchCategoryHierarchy,
      fetchBMByCat: (catid) => fetchBMByCat(catid), //for fetching booksmarks by selected category
      fetchBMCat: fetchBMCat, //for fetching categories and count
      errorOut: errorAfterFiveSeconds,
      deleteBM: (id, cat_id) => deleteBM(id, cat_id),
      editBM: (id) => editBM(id),
      cancelEdit: (id) => cancelEdit(id),
      updateBM: (id, url, cat_id, category, currentcat) => updateBM(id, url, cat_id, category, currentcat),
      searchData: (text) => searchData(text),
      cleanSearch: cleanSearch,
      fetchTermsFromDB: () => fetchTermsFromDB(),
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
