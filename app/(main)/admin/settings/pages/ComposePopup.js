// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// ** Icon Imports
import Icon from "@/app/components/icon";

// ** Third Party Components
import { EditorState, convertToRaw } from "draft-js";
import  draftToHtml from "draftjs-to-html";
// ** Custom Components Imports
import OptionsMenu from "@/app/components/option-menu";
import CustomAvatar from "@/app/components/avatar";
import ReactDraftWysiwyg from "@/app/components/react-draft-wysiwyg";

// ** Styled Component Imports
import { EditorWrapper } from "@/app/styles/react-draft-wysiwyg";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// ** Utils Import
import { getInitials } from "@/app/utils/get-initials";

// ** Styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useSWR from "swr";
import { sendNewEmail } from "../../../../redux/state/slices/admin/sendMail";
import { useDispatch } from "react-redux";


const filter = createFilterOptions();

const ComposeEmail = (props) => {
  const dispatch =  useDispatch();
  const { data: getUsers, isLoading } = useSWR("/store/email-receivers");
  // ** Props
  const accounts = getUsers?.data || [];
  const theme = useTheme();

  // ** States
  const [emailTo, setEmailTo] = useState([]);
  const [ccValue, setccValue] = useState([]);
  const [subjectValue, setSubjectValue] = useState("");
  const [bccValue, setbccValue] = useState([]);
  const [messageValue, setMessageValue] = useState(EditorState.createEmpty());

  const [visibility, setVisibility] = useState({
    cc: false,
    bcc: false,
  });

  function convertEditorStateToHTML(editorState) {
    const contentState = editorState.getCurrentContent();
    const contentStateRaw = convertToRaw(contentState);
    return draftToHtml(contentStateRaw);
  }


  const handleSendEmail = () => {
    const contentState = messageValue.getCurrentContent();
    const contentText = contentState.getPlainText(); // Get the plain text content
    const htmlContent = convertEditorStateToHTML(messageValue);

    const payload = {
      to: emailTo,
      subject: subjectValue,
      html_content: htmlContent,
      raw_content: contentText,
    };
    sendNewEmail(payload, dispatch)
  };
  const toggleVisibility = (value) =>
    setVisibility({ ...visibility, [value]: !visibility[value] });

  const handleMailDelete = (value, state, setState) => {
    const arr = state;
    const index = arr.findIndex((i) => i.value === value);
    arr.splice(index, 1);
    setState([...arr]);
  };

  const resetEmail = () => {
    setEmailTo([]);
    setccValue([]);
    setbccValue([]);
    setSubjectValue("");
    setMessageValue(EditorState.createEmpty());
    setVisibility({
      cc: false,
      bcc: false,
    });
  };

  const renderCustomChips = (array, getTagProps, state, setState) => {
    return array.map((item, index) => (
      <Chip
        size="small"
        key={item.value}
        label={item.name}
        // {...getTagProps({ index })}
        deleteIcon={<Icon icon="tabler:x" />}
        onDelete={() => handleMailDelete(item.value, state, setState)}
      />
    ));
  };

  const renderListItem = (props, option, array, setState) => {
    return (
      <ListItem
        key={option.email}
        sx={{ cursor: "pointer" }}
        onClick={() => setState([...array, option])}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {option.image ? (
            <CustomAvatar
              src={option.image}
              alt={option.name}
              sx={{ mr: 3, width: 22, height: 22 }}
            />
          ) : (
            <CustomAvatar
              skin="light"
              color="primary"
              sx={{ mr: 3, width: 22, height: 22, fontSize: "0.65rem" }}
            >
              {getInitials(option.name)}
            </CustomAvatar>
          )}
          <Typography sx={{ fontSize: "0.875rem" }}>{option.name}</Typography>
        </Box>
      </ListItem>
    );
  };

  const addNewOption = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        name: inputValue,
        value: inputValue,
        src: "",
      });
    }

    // @ts-ignore
    return filtered;
  };

  return (
    <Box>
      <Box
        sx={{
          px: 5,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "action.hover",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Compose Mail
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ p: 1 }} onClick={resetEmail}>
            <Icon icon="tabler:x" fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          px: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <div>
            <InputLabel
              sx={{ mr: 3, fontSize: "0.875rem" }}
              htmlFor="email-to-select"
            >
              To:
            </InputLabel>
          </div>
          <Autocomplete
            multiple
            freeSolo
            value={emailTo}
            clearIcon={false}
            id="email-to-select"
            filterSelectedOptions
            options={accounts}
            ListboxComponent={List}
            filterOptions={addNewOption}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              return renderListItem(props, option, emailTo, setEmailTo);
            }}
            renderTags={(array, getTagProps) =>
              renderCustomChips(array, getTagProps, emailTo, setEmailTo)
            }
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": { p: 2 },
              "& .MuiAutocomplete-endAdornment": { display: "none" },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoComplete="new-password"
                sx={{
                  "& fieldset": { border: "0 !important" },
                  "& .MuiOutlinedInput-root": { p: "0 !important" },
                  "& .MuiInputBase-input": {
                    px: (theme) => `${theme.spacing(1.5)} !important`,
                    py: (theme) => `${theme.spacing(2.125)} !important`,
                  },
                }}
              />
            )}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          <Box
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={() => toggleVisibility("cc")}
          >
            Cc
          </Box>
          <Box component="span" sx={{ mx: 1 }}>
            |
          </Box>
          <Box
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={() => toggleVisibility("bcc")}
          >
            Bcc
          </Box>
        </Typography>
      </Box>
      {visibility.cc ? (
        <Box
          sx={{
            px: 5,
            display: "flex",
            alignItems: "center",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <div>
            <InputLabel
              sx={{ mr: 3, fontSize: "0.875rem" }}
              htmlFor="email-cc-select"
            >
              Cc:
            </InputLabel>
          </div>
          <TextField
            fullWidth
            size="small"
            sx={{
              "& fieldset": { border: "0 !important" },
              "& .MuiOutlinedInput-root": { p: "0 !important" },
            }}
          />
        </Box>
      ) : null}
      {visibility.bcc ? (
        <Box
          sx={{
            px: 5,
            display: "flex",
            alignItems: "center",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <div>
            <InputLabel
              sx={{ mr: 3, fontSize: "0.875rem" }}
              htmlFor="email-bcc-select"
            >
              Bcc:
            </InputLabel>
          </div>
          <TextField
            fullWidth
            size="small"
            sx={{
              "& fieldset": { border: "0 !important" },
              "& .MuiOutlinedInput-root": { p: "0 !important" },
            }}
          />
        </Box>
      ) : null}
      <Box
        sx={{
          px: 5,
          display: "flex",
          alignItems: "center",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <div>
          <InputLabel
            sx={{ mr: 3, fontSize: "0.875rem" }}
            htmlFor="email-subject-input"
          >
            Subject:
          </InputLabel>
        </div>
        <Input
          fullWidth
          value={subjectValue}
          id="email-subject-input"
          onChange={(e) => setSubjectValue(e.target.value)}
          sx={{
            "&:before, &:after": { display: "none" },
            "& .MuiInput-input": { py: 2.125 },
          }}
        />
      </Box>
      <EditorWrapper
        sx={{
          "& .rdw-editor-wrapper .rdw-editor-main": { px: 5 },
          "& .rdw-editor-wrapper, & .rdw-option-wrapper": { border: 0 },
        }}
      >
        <ReactDraftWysiwyg
          editorState={messageValue}
          onEditorStateChange={(editorState) => setMessageValue(editorState)}
          placeholder="Write your message..."
          toolbar={{
            options: ["inline", "list", "link", "image"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline"],
            },
            list: {
              inDropdown: false,
              options: ["unordered", "ordered"],
            },
            link: {
              inDropdown: false,
              options: ["link"],
            },
          }}
        />
      </EditorWrapper>
      <Box
        sx={{
          py: 4,
          px: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={handleSendEmail}
            sx={{ "& svg": { mr: 2 } }}
          >
            <Icon icon="tabler:send" fontSize="1.125rem" />
            Send
          </Button>
          <IconButton size="small" sx={{ ml: 3, color: "text.secondary" }}>
            <Icon icon="tabler:paperclip" fontSize="1.25rem" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <OptionsMenu
            iconButtonProps={{ size: "small" }}
            iconProps={{ fontSize: "1.25rem" }}
            options={["Print", "Check spelling", "Plain text mode"]}
            menuProps={{
              anchorOrigin: { vertical: "top", horizontal: "right" },
              transformOrigin: { vertical: "bottom", horizontal: "right" },
            }}
          />
          <IconButton size="small" onClick={resetEmail}>
            <Icon icon="tabler:trash" fontSize="1.25rem" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ComposeEmail;
