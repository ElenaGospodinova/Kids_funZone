export const fetchAccessToken = async (setError, setTracks, setKidsSongs, setAccessToken) => {
    const CLIENT_ID = "a829cad6b64344c88a2b7425a94e9f06";
    const CLIENT_SECRET = "25ab471a807e411c82a140cfa83461ba";
  
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
  
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
      const data = await response.json();
      const accessToken = data.access_token;
      setAccessToken(accessToken); // Assuming you have a state variable for access token
      fetchSongsList(accessToken, setKidsSongs);
    } catch (error) {
      setError("Error fetching access token");
      console.error("Error:", error);
    }
  };
  
  // Function to search for an artist
  export const searchForArtist = async (searchInput, accessToken) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=artist`, searchParameters);
      const artistData = await response.json();
      const artistID = artistData.artists?.items[0]?.id;
  
      if (!artistID) throw new Error("No artist found for the search query.");
  
      const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, searchParameters);
      const albumsData = await albumsResponse.json();
      return albumsData.items.map((album) => ({
        ...album,
        image: album.images[0]?.url || "",
      }));
    } catch (error) {
      throw new Error("Error occurred while fetching artist data");
    }
  };
  
  
  // Function to fetch songs list
  export const fetchSongsList = async (accessToken, setKidsSongs) => {
    const searchParameters = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
  
    try {
      const kidsSongsResponse = await fetch("https://api.spotify.com/v1/search?q=kids_songs+songs&type=track&limit=24", searchParameters);
      const kidsData = await kidsSongsResponse.json();
      setKidsSongs(kidsData.tracks?.items);
    } catch (error) {
      throw new Error("Error fetching kids songs");
    }
  };
  