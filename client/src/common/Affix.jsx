import { ArrowUpward } from "@mui/icons-material";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Transition, rem } from "@mantine/core";
import { Button } from "@mui/material";
const Scrollup = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              sx={{
                ...transitionStyles,
                backgroundColor: "#0F172A",
                color: "#fff",
                borderRadius: rem(8),
                // padding: rem(1),
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "#0a1224", // Darker shade on hover
                },
                ":focus": {
                  outline: `2px solid ${rem(2)} #0056b3`, // Focus outline
                },
              }}
              onClick={() => scrollTo({ y: 0 })}
            >
              <ArrowUpward />
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};
export default Scrollup;
