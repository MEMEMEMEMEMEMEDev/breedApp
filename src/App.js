import {
  AppBar,
  Autocomplete,
  CssBaseline,
  FormControl,
  Typography,
  TextField,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFetch } from "./hook/useFetch";

export default function App() {
  const url = "https://api.TheDogAPI.com/v1/breeds";
  const { data, loading } = useFetch(url);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState(null);

  useEffect(() => {
    if (data) {
      setBreeds(data);
    }
  }, [data]);

  return (
    <div className="app">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container maxWidth="md">
          <CssBaseline />
          <Box mt={2} textAlign={"center"}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "gray",
              }}
            >
              <Typography variant="h6">
                <span role="img" aria-label="dog">
                  🐶
                </span>
                Dog Breed Search
              </Typography>
            </AppBar>
          </Box>

          <Box mt={2}>
            <FormControl
              fullWidth
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Autocomplete
                multiple
                id="demo-mutiple-chip"
                options={breeds}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  setSelectedBreeds(value);
                }}
                style={{ width: 700 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Breeds"
                    placeholder="Breeds"
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Box>

          <Box mt={10} textAlign={"center"}>
            <Grid container spacing={3}>
              {selectedBreeds &&
                selectedBreeds.map((breed) => (
                  <Grid item xs={12} sm={6} md={4} key={breed.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt={breed.name}
                        height="140"
                        image={breed.image.url}
                        title={breed.name}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          fontSize={15}
                        >
                          {breed.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}
