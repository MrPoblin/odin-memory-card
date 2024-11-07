import { useState } from 'react'
import './App.css'
import _ from 'lodash';
import Score from './components/Score';
import BestScore from './components/BestScore';
import AnimeImage from './components/AnimeImage';

const imageCount = 12;

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [images, setImages] = useState(createImages());

    function clickHandler(e){
      const id = e.target.dataset.id;
      setClicked((prevClicked) => {
        if(prevClicked.includes(id)){
          setScore(0);
          return [];
        }
        else{
          setScore((prevScore) => {
            setBestScore((prevBestScore) => {
              if(prevScore + 1 >= prevBestScore){
                if(prevScore + 1 >= imageCount){
                  setTimeout(() => {
                    alert("You win!");
                    setScore(0);
                    setClicked([]);
                  }, 100);
                }
                return prevScore + 1;
              }
              return prevBestScore;
            });
            return prevScore + 1;
          });
          return [...prevClicked, id];
        }
      })
      setImages((prevImages) => {
        return _.shuffle(prevImages);
      })
    }

  function createImages(){
    const array = [];
    for(let i = 0; i < imageCount; i++){
      const id = crypto.randomUUID()
      array.push((<AnimeImage key={id} id={id} onPush={clickHandler} />));
    }
    return array;
  }

  return (
    <>
      <div className='header'>
        <div />
        <h1>Anime Memory Game</h1>
        <div>
          <Score score={score} maxScore={imageCount} />
          <BestScore bestScore={bestScore} />
        </div>
        <div />
        <p>Get points by clicking on an image, but don&apos;t click on any more than once!</p>
      </div> 
      <div className='images'>
        {images.map((image) => image)}
      </div>     
    </>
  )
}

export default App
