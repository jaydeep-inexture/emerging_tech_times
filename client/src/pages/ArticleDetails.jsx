// ArticleDetails.js
import { Person } from "@mui/icons-material";
import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMobile } from "../context/isMobileContext";

const ArticleDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const article = location.state?.article;
  const isMobile = useMobile();

  return (
    <>
      <Box
        sx={{
          paddingX: "10%",
          marginBottom: isMobile ? "10%" : "5%",
          marginTop: "2%",
        }}
      >
        <Grid container spacing={5}>
          {isMobile && (
            <Grid item xs={12}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight={800}>
              {article.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Person sx={{ mr: 1 }} />
                <Typography color="text.secondary" fontSize={20}>
                  {article.author} - {article.date}
                </Typography>
              </Box>
              <Chip label={article.category} variant="outlined" />
            </Box>
            <Typography fontSize={20} mt={1}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At vero
              autem voluptatibus? Ea qui nemo tempore temporibus obcaecati
              placeat explicabo ipsum nihil deleniti, ullam ab, possimus
              voluptatem facilis tempora odit soluta, iure in officiis adipisci
              fugit expedita modi? Cum dolores repudiandae dolorem iusto amet
              explicabo ab, fugit alias laborum quibusdam earum ex saepe natus
              accusamus sed quaerat debitis excepturi et mollitia eligendi in
              nam commodi. Ipsum ab laborum modi. Ea quas dolores culpa, ipsa
              reprehenderit, ab numquam consectetur accusantium minima, commodi
              assumenda rem alias ullam ad voluptatem laudantium nisi quisquam!
              Est ducimus sit ipsum quisquam natus molestiae nam perferendis ab.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontSize={20}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
              earum id sint ratione, blanditiis rem delectus modi eaque omnis,
              nulla incidunt esse nesciunt quam, corporis dignissimos
              repellendus consequuntur laudantium doloremque dolor soluta
              similique quis reiciendis! Autem dolores soluta natus non
              repudiandae necessitatibus, eos quos, dolor alias, ducimus est eum
              deleniti dicta officiis odit. Sequi nobis asperiores error?
              Quibusdam dolore aliquam incidunt dicta provident repellendus
              dolor tempore illo nulla nostrum, sapiente doloribus placeat
              aliquid aspernatur! Porro illum rem voluptatum esse aliquam
              doloribus odit, culpa perferendis. Fugiat amet, dolor atque dolore
              quas tempore facilis nostrum eius, distinctio veniam perferendis
              quia natus deleniti officiis! Suscipit magnam vero voluptates
              repudiandae veniam ut? Cupiditate perferendis natus iusto, alias
              ducimus beatae odio! Tempore corporis, ex ratione ullam voluptas
              amet quibusdam ducimus facilis, officiis reiciendis, voluptates
              rerum. Perferendis voluptas obcaecati quibusdam laudantium
              accusantium sapiente, nemo sit, quae unde tenetur provident,
              labore impedit adipisci praesentium molestias quam. Nisi unde
              nulla quos ab quidem facilis? Culpa ad atque nam maiores
              consequatur aspernatur eos pariatur velit iste! Harum tempora
              quidem optio, voluptatibus perspiciatis dolorem corrupti quae
              nostrum laborum vitae. Ratione tenetur, explicabo molestiae
              incidunt fuga sit expedita? Consequatur sit laborum, excepturi
              dolorem quia quo molestias velit quod vitae animi itaque.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ArticleDetails;
