import React, {useState} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function HandSign(props) {
        const [like, setLike] = useState(false);
        const addLike = (sign) => {
          setLike(!like);
          console.log(sign.split('-')[0]);
        }

        return (
            <div className="carousel-item">
              <div className="d-flex justify-content-center">
                <div className="d-flex carousel-content align-items-end">
                  <img className="d-block img-fluid carousel-img m-auto" src={'uploads/'+props.image} alt={"Slide Number "+ props.index} />
                  <div className='likeButton' onClick={() => {addLike(props.image)}}>
                    {
                      like ? <FavoriteIcon fontSize='large' /> : <FavoriteBorderIcon fontSize='large'/>
                    }
                  </div>
                </div>
              </div>

            </div>
        )
}

export default HandSign
