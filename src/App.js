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
  const { data, loading } = useFetch("https://dog.ceo/api/breeds/list/all");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectedSubBreeds, setSelectedSubBreeds] = useState([]);

  useEffect(() => {
    if (data) {
      const breed = Object.keys(data.message);
      const onlySubBreedsNames = breed.map((breed) => {
        return data.message[breed];
      });
      const subBreedsNames = onlySubBreedsNames.flat();
      const subBreedsNamesWithoutDuplicates = [...new Set(subBreedsNames)];
      setBreeds(breed);
      setSubBreeds(subBreedsNamesWithoutDuplicates);
    }
  }, [data]);

  return (
    <div className="app">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="app">
          <CssBaseline />
          <AppBar
            title="Dog Breeds"
            position="static"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#287eb8de",
            }}
          >
            <Typography variant="h6" fontSize={35} letterSpacing={5}>
              Dog Breeds
            </Typography>
          </AppBar>
          <Container>
            <Box>
              <FormControl
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  style={{ width: "70%", marginTop: "5%" }}
                  multiple
                  id="breeds"
                  options={breeds}
                  getOptionLabel={(option) => option}
                  onChange={(event, breed) => {
                    setSelectedBreeds(breed);
                  }}
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

                <Autocomplete
                  style={{ width: "70%", marginTop: "20px" }}
                  multiple
                  id="subBreeds"
                  options={subBreeds}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    setSelectedSubBreeds(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Sub-Breeds"
                      placeholder="Sub-Breeds"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box>
              <Grid container spacing={3}>
                {selectedBreeds.map((breed) => {
                  return (
                    <Grid item xs={12} sm={6} md={4}>
                      <Card key={breed}>
                        <CardMedia
                          style={{ height: "200px" }}
                          image={`https://dog.ceo/api/breed/${breed}/images/random`}
                          title={breed}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            textAlign={"center"}
                          >
                            {breed}
                          </Typography>
                        </CardContent>
                      </Card>

                      {selectedSubBreeds.map((subBreed) => {
                        return (
                          <Card key={subBreed}>
                            <CardMedia
                              style={{ height: "200px" }}
                              image={
                                `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random` ||
                                `https://dog.ceo/api/breed/${breed}/images/random`
                              }
                              title={subBreed}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                textAlign={"center"}
                              >
                                {subBreed}
                              </Typography>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
}
