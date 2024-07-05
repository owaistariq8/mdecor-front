import PropTypes from 'prop-types';
import * as React from 'react';
import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Iconify from '../../../components/iconify';

ItemsCardView.propTypes = {
    items: PropTypes.array
};

export default function ItemsCardView({items}) {

    console.log(items)
  return (
    <>
    {/* <ImageList>
      <ImageListItem key="Subheader" cols={6} /> */}
    <Box gap={0.5} display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', xl: 'repeat(6, 1fr)'}}>
          
      {items.map((item) => (
        <ImageListItem key={item?.images[0]} sx={{}}>
          <ImageListItemBar
              sx={{
                borderRadius:'10px 10px 0px 0px',
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.name}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.name}`}
                >
                  <Iconify icon="mdi:view" />
                </IconButton>
              }
              actionPosition="left"
            />
          {/* {item?.images?.length>0?(
            <img
              srcSet={`${item?.images[0]?.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item?.images[0]?.path}?w=248&fit=crop&auto=format`}
              alt={item?.name}
              loading="lazy"
            />
            ):(
              <img
                srcSet='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x'
                src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format'
                alt={item?.name}
                loading="lazy"
              />
            )
          } */}
          <img
            srcSet='https://placehold.co/248x200?text=Image&font=font=montserrat'
            src='https://placehold.co/248x200?text=Image&font=font=montserrat'
            alt={item?.name}
            loading="lazy"
            style={{borderRadius:'10px', border:'1px solid gray'}}
          />
          <ImageListItemBar
            title={`$${item?.price || 100} NZD`}
            // subtitle={item?.desc}
            sx={{borderRadius:'0px 0px 10px 10px'}}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
      </Box>
    {/* </ImageList> */}
    </>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];
