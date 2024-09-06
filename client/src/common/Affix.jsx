import { ArrowUpward } from "@mui/icons-material";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Transition, rem } from "@mantine/core";
import { Paper } from "@mui/material";
const Scrollup = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Paper
              sx={{
                ...transitionStyles,
                backgroundColor: "#0F172A",
                color: "#fff",
                borderRadius: "50%",
                padding: rem(6),
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#0a1224",
                },
                ":focus": {
                  outline: `2px solid ${rem(2)} #0056b3`,
                },
              }}
              onClick={() => scrollTo({ y: 0 })}
            >
              <ArrowUpward sx={{ width: "2rem", height: "2rem" }} />
            </Paper>
          )}
        </Transition>
      </Affix>
    </>
  );
};
export default Scrollup;
