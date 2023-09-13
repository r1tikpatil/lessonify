import React, { useState } from 'react';

function SpellQuestion({ question, checkAnswer, next, size, index, showResult }) {
  const [spell, setSpell] = useState('');

  return (
    <>
      <div style={{ marginTop: '200px' }}>
        <h1 className="heading">SPELLSCREEN: Free spelling test </h1>
          <div style={{ width: '50%', margin: '3rem auto', textAlign: "center"}}>
            <h3>Test your spelling skills </h3>
              <br/>
              <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Type your spelling; press enter to move to the next word or click on the triangle symbol above to hear the word again.
              </p>
              <figure>
                <figcaption>Listen to the Word: </figcaption>
                <audio
                  controls
                  autoPlay
                  src={question.src}
                  type="audio/mpeg"
                >
                  Your browser does not support the
                  <code> audio </code> element.
                </audio>
              </figure>

              <form onSubmit={(e)=>e.preventDefault()} style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnSpacing: '2rem', textAlign: "center", margin: "0 auto" }}>
                <input style={{ color: 'black' }} value={spell} onChange={(e) => setSpell(e.target.value)} type="text" id="name" name="name" minlength="4" maxlength="8" size="10" />
                <button type="submit" className='next' style={{ marginLeft: '2rem' }}
                    onClick={() => {

                      setSpell(() => "");
                      checkAnswer(spell, question.answer);
                      next(() => {if(index<size-1){return index+1} else { showResult(true); return index} } )} }>
                        {index < size-1 ? 'Enter': 'Finish'}
                </button>
              </form>
          </div>
      </div>
    </>
  );
}

export default SpellQuestion;
