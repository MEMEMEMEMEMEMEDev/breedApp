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
import { ClipLoader } from "react-spinners";
import { useFetch } from "./hook/useFetch";

export default function App() {
  const { data, loading } = useFetch("https://api.TheDogAPI.com/v1/breeds");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState(null);

  useEffect(() => {
    if (data) {
      setBreeds(data);
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      {loading ? (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            maxWidth: "100vw",
          }}
        >
          <ClipLoader size={50} color={"gray"} loading={loading} />
        </Box>
      ) : (
        <>
          <CssBaseline />
          <Box mt={2} textAlign={"center"}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "lightblue",
                width: "70%",
                margin: "0 auto",
                borderRadius: "10px",
                color: "whitesmoke",
                padding: "1%",
              }}
            >
              <Typography variant="h6" fontSize={20}>
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
                options={breeds}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  setSelectedBreeds(value);
                }}
                style={{
                  width: "60%",
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
        </>
      )}
    </Container>
  );
}
