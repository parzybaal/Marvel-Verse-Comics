/* eslint-disable react/prop-types */
import "./CardDetail.scss"
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import CircularProgress from '@mui/material/CircularProgress';
import { getComicById } from '../../services/api/getComics';
import { useDispatch, useSelector } from 'react-redux';
import { setComicById } from "../../redux/slice/comicSlice";
import { useQuery } from "react-query";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const CardDetail = ({ id }) => {

    const dispatch = useDispatch();
    const comic = useSelector(state => state.comics.comicById)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isLoading, refetch } = useQuery(["comic", id], () => getComicById.getById(id), {
        enabled: false,
        onSuccess: (data) => {
            dispatch(setComicById(data.data));
        },
    });

    const formatDate = (isoDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(isoDate);
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <>
                <InfoIcon onClick={() => { handleOpen(), refetch() }}></InfoIcon>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {isLoading
                        ? (
                            <Box sx={style}>
                                <CircularProgress size={100} />
                            </Box>
                        )
                        : (
                            < Box className="card_container" sx={style}>
                                <div className="image_container">
                                    <img
                                        className="comics_image"
                                        src={`${comic?.image}`}
                                        alt={comic?.title}
                                    />
                                </div>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {comic?.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <strong>Publicado: </strong><span>{formatDate(comic?.published)}</span>
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Descripción: </strong><span>{comic?.description ? comic?.description : "Este comic no cuenta con descripción"}</span>
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Creadores: </strong>{
                                        comic?.creators?.length ? (
                                            comic?.creators?.map(creator => { return <span key={creator?.name}>{creator?.name}, </span> })
                                        )
                                            : ("Este comic no tiene creadores registrados")
                                    }
                                </Typography>
                                <div className="card_characters">
                                    <strong>Personajes: </strong>{
                                        comic?.characters?.length ? (
                                            <ul>
                                                {comic?.characters?.map(character => { return <li key={character?.name}>{character?.name}, </li> })}
                                            </ul>
                                        )
                                            : ("Este comic no tiene personajes registrados")
                                    }
                                </div>
                            </Box>
                        )
                    }
                </Modal>
            </>
        </div >
    );
}

export default CardDetail;