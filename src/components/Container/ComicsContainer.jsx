import "./ComicsContainer.scss"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NotFound from "../../views/NotFound/NotFound"
import { useQuery } from "react-query";
import { setLoadComics } from "../../redux/slice/comicSlice";
import { getApiInfo } from "../../services/api/getComics";
import { useDispatch, useSelector } from "react-redux"
import CardDetail from "../CardDetail/CardDetail";
import { useState } from "react";


const ComicsContainer = () => {

    const dispatch = useDispatch();
    const comics = useSelector((state) => state.comics.comicsFiltered);

    //LOGICA DE PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const comicsForPage = 4;
    const totalComics = comics?.length;
    const totalPages = Math.ceil(totalComics / comicsForPage);
    const indexOfLastComic = currentPage * comicsForPage;
    const indexOfFirstComic = indexOfLastComic - comicsForPage;
    const currentComics = comics?.slice(indexOfFirstComic, indexOfLastComic);

    const { isLoading } = useQuery(["comics"], getApiInfo.apiInfo, {
        onSuccess: (data) => {
            dispatch(setLoadComics(data.data));
        },
    });

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <section>
            {isLoading ? (
                <Box className="spinner" sx={{ display: "flex" }}>
                    <CircularProgress size={300} />
                </Box>
            ) :
                !currentComics?.length ? (
                    <NotFound></NotFound>
                ) : (
                    <ImageList className="comics_container" sx={{ width: "100%", height: "100vh" }}>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader className="banner_container" component="div">
                                <img className="banner" src="banner.png" alt="marvel_comics_banner" />
                            </ListSubheader>
                            <div className="pagination_container">
                                <Stack spacing={2}>
                                    <Pagination
                                        className="pagination_items"
                                        count={totalPages} size="large"
                                        color='primary' style={{ color: 'white' }}
                                        sx={{ '& .MuiPaginationItem-root': { color: '#fff', }, }}
                                        onChange={handlePageChange}
                                    />
                                </Stack>
                            </div>
                        </ImageListItem>
                        {currentComics?.map((item, index) => (
                            <ImageListItem key={index}>
                                <img className="comics-image" src={item.image} srcSet={item.image} alt={item.title} loading="lazy" />
                                <ImageListItemBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${item.title}`}>
                                            <CardDetail id={item.id} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
            }
        </section>
    );
};

export default ComicsContainer;

