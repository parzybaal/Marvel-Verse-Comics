import "./Navbar.scss"
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setComicsFiltered } from "../../redux/slice/comicSlice";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: "black",
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    borderRadius: '25px',
    border: '0.1px solid rgba(0, 0, 0, 0.44)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Navbar() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
        dispatch(setComicsFiltered(searchText));
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="navbar_container" position="fixed" color="default">
                <Toolbar >
                    <img className='logo' src="https://w7.pngwing.com/pngs/419/220/png-transparent-logo-marvel-comics-marvel-entertainment-marvel-studios-others-comics-avengers-text.png" alt="logo_de_marvel" />
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={handleChange}
                            value={search}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}