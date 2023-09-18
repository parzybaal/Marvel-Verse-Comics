import { createSlice } from '@reduxjs/toolkit';

export const comicSlice = createSlice({
    name: 'comics',
    initialState: {
      comics: [],
      comicById: [],
      comicsFiltered: []
    },
    reducers: {
      setLoadComics: (state, action) => {
        const array = [...action.payload.data.results]
        const arrayOfComics = array.map(comic => {
         return comic = {
            id: comic.id,
            title: comic.title,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
          }
        })
        state.comics = arrayOfComics
        state.comicsFiltered = arrayOfComics
      },
      setComicById: (state, action) => {
        const array = [...action.payload.data.results];
        const selectedComic = {
          id: array[0].id,
          title: array[0].title,
          image: `${array[0].thumbnail.path}.${array[0].thumbnail.extension}`,
          description: array[0].description,
          creators: array[0].creators.items,
          published: array[0].dates[0].date,
          characters: array[0].characters.items
        };

        state.comicById = selectedComic;
      },
      setComicsFiltered: (state, action) => {
        const comicsArray = state.comics
        state.comicsFiltered = comicsArray.filter(comic =>
          comic.title.toLowerCase().includes(action.payload)
        );
      }
    },
  });

export const {
  setLoadComics,
  setComicById,
  setComicsFiltered,
} = comicSlice.actions

export default comicSlice.reducer;


