import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { Box, color } from "@mui/system";
import React, { useState } from "react";

function SummaryCard({ title, content, children }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Save the edited content
    console.log("Saved content:", editedContent);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    // Cancel editing
    setEditedContent(content);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <div>
      <Box sx={{ minWidth: 765, marginBottom: "20px" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <div style={{ marginBottom: "15px" }} /> {/* Adding space  */}
            {editMode ? (
              <TextField value={editedContent} onChange={handleInputChange} />
            ) : (
              <Typography
                variant="body1"
                gutterBottom
              >
                {content}
              </Typography>
            )}
            {children}
          </CardContent>
          {/* <CardActions>
            {editMode ? (
              <div>
                <Button size="small" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button size="small" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button size="small" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </CardActions> */}
        </Card>
      </Box>
    </div>
  );
}

export default SummaryCard;
