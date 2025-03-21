import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    { _id: 1, title: 'Alien',
      description: 'After investigating a mysterious transmission of unknown origin, the crew of a commercial spacecraft encounters a deadly lifeform. One of the greatest slasher films ever created.',
      genre: { name: 'Science Fiction', description: 'Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies.' },
      director: { name: 'Ridley Scott', bio: 'Sir Ridley Scott (born 30 November 1937) is an English film director and producer. He has directed the science fiction horror film Alien (1979), the neo-noir dystopian film Blade Runner (1982), the road adventure film Thelma & Louise (1991), the historical drama film Gladiator (2000), the war film Black Hawk Down (2001), and the science fiction film The Martian (2015).', birth: '1937' }
    },
    { _id: 2, title: 'The Shining',
      description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
      genre: { name: 'Horror', description: 'Horror is a film genre seeking to elicit a negative emotional reaction from viewers by playing on the audience\'s primal fears. Horror films often feature scenes that startle the viewer; the macabre and the supernatural are frequent themes.' },
      director: { name: 'Stanley Kubrick', bio: 'Stanley Kubrick was an American film director, screenwriter, and producer. He is frequently cited as one of the greatest filmmakers in cinematic history. His films, which are mostly adaptations of novels or short stories, cover a wide range of genres, and are noted for their realism, dark humor, unique cinematography, extensive set designs, and evocative use of music.', birth: '1928', death: '1999' }
    },
    { _id: 3, title: 'Castle in the Sky',
      description: 'Pazus life changes when he meets Sheeta, a girl whom pirates are chasing for her crystal amulet, which has the potential to locate Laputa, a legendary castle floating in the sky.',
      genre: { name: 'Animation', description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI).' },
      director: { name: 'Hayao Miyazaki', bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, a film and animation studio, he has attained international acclaim as a masterful storyteller and creator of animated feature films, and is widely regarded as one of the greatest animation directors.', birth: '1941' }
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};