

 const filterMovies = (movies) => {
    // Assuming movies tagged with genre ID 16 are kids movies
    return movies.filter(movie => movie.genre_ids.includes(16));
  };
  
    export const fetchMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzZhNjU2MTg2ZTUwMmVmNTJiNWNiNWI5YjhjMGYyZiIsInN1YiI6IjY1Zjk4YmI2NGI5YmFlMDE4MzdmMDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JaFUhFgqzQ_yOKWKtIk14GkzVi6zuaSN06SkILilSS0'
        }
      };
      
      try {
        const response = await fetch(url, options);
  
        if (response.ok) {
            const result = await response.json();
            const movieResults = result.results || [];
  
            const movieData = movieResults.map(movie => ({
                id: movie.id.toString(),
                title: movie.title,
                image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://example.com/fallback-image.jpg',
                streamingUrl: null, // can set streaming URL if available in the response
                genre_ids: movie.genre_ids // assuming genre_ids are available in the response
            }));
            
            setMovies(movieData);
            setLoading(false);
        } else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  
  // useEffect(() => {
  //   fetchMovies();
  // }, []);
  
  const handlePlayMovie = (streamingUrl) => {
    console.log('Playing movie with streaming URL:', streamingUrl);
    // Logic to play the movie using the streaming URL
  };
  
  //Mock finction that minics addings the movies to the database 
  export const addMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
      const options ={
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzZhNjU2MTg2ZTUwMmVmNTJiNWNiNWI5YjhjMGYyZiIsInN1YiI6IjY1Zjk4YmI2NGI5YmFlMDE4MzdmMDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JaFUhFgqzQ_yOKWKtIk14GkzVi6zuaSN06SkILilSS0'
      },
      body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          watchlist: true,
        }),
   };
   const res = await fetch(url, options);
  
    if (!res.ok) {
      throw new Error('Failed to fetch movies');
    }
  
    const json = await res.json();
    return json;
  };