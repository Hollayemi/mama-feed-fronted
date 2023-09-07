// ** MUI Imports
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// ** Icon Imports
import Icon from "@/app/components/icon";



const Faqs = ({ data }) => {
  return (
    <Box className="!my-3">
      {data.map((item) => {
        return (
          <Accordion key={item.id} className=" !border-0 bg-pink-50">
            <AccordionSummary
              expandIcon={
                <Icon fontSize="1.25rem" icon="tabler:chevron-down" />
              }
            >
              <Typography sx={{ fontWeight: "500" }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "text.secondary" }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Faqs;
