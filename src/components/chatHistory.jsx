import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ChatHistory = ({children, expanded}) => {
  return (
    <div className="chat-history">
      <Accordion rounded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          className="chat-accordion"
          expanded={expanded}
        >
          Chat History
        </AccordionSummary>
        <AccordionDetails className="chat">
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ChatHistory;