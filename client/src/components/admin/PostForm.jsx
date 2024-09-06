import {
  Box,
  Button,
  Grid,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PhotoAlbumOutlined } from "@mui/icons-material";
import Spinner from "@/common/Spinner";
import { createPost, updatePost } from "@/helpers/api";
import { CONSTANTS } from "@/helpers/constants";
import { setNotification } from "@/redux/notificationSlice";
import { resetPosts, setLoading, setSelectedPost } from "@/redux/postSlice";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
const PostForm = ({ setActiveTab }) => {
  const fileimageref = useRef(null);
  const dispatch = useDispatch();
  const { selectedPost, loading } = useSelector((state) => state.post);

  const [errors, setErrors] = useState({});
  const [existingImageFileName, setExistingImageFileName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageFile: null,
    authorName: "",
    authorDescription: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    seoTitle: "",
    seoDescription: "",
    seoSlug: "",
    category: "",
  });
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, TextStyle, Color, Highlight],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prevData) => ({
        ...prevData,
        description: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(setSelectedPost(null));
    };
  }, [dispatch]);

  console.log("selectedpost", selectedPost);
  useEffect(() => {
    if (selectedPost) {
      setFormData({
        title: selectedPost?.title ? selectedPost.title : "",
        description: selectedPost?.description ? selectedPost.description : "",
        imageFile: null,
        authorName: selectedPost?.author.name ? selectedPost.author.name : "",
        authorDescription: selectedPost?.author.description
          ? selectedPost.author.description
          : "",
        twitter: selectedPost.author.socials?.twitter
          ? selectedPost.author.socials.twitter
          : "",
        instagram: selectedPost.author.socials?.instagram
          ? selectedPost.author.socials.instagram
          : "",
        linkedin: selectedPost.author.socials?.linkedin
          ? selectedPost.author.socials.linkedin
          : "",
        seoTitle: selectedPost?.seo.title ? selectedPost.seo.title : "",
        seoDescription: selectedPost?.seo.description
          ? selectedPost.seo.description
          : "",
        seoSlug: selectedPost?.seo.slug ? selectedPost.seo.slug : "",
        category: selectedPost?.category ? selectedPost.category : "",
      });
    }
    if (editor) {
      editor.commands.setContent(selectedPost?.description || "");
    }
    const imageUrl = selectedPost?.imageUrl || "";
    setExistingImageFileName(imageUrl ? imageUrl.split("/").pop() : "");
  }, [selectedPost, editor]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.authorName) newErrors.authorName = "Author Name is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!fileTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageFile: "Only image files are allowed",
        }));
        return;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageFile: null,
      }));
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
    }
  };

  const createNewPost = async (formData) => {
    dispatch(setLoading(true));

    try {
      const data = await createPost(formData);
      dispatch(resetPosts());
      dispatch(
        setNotification({
          type: "success",
          message: data.msg,
        })
      );
      dispatch(setLoading(false));
      // Clear form data
      setFormData({
        title: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        seoSlug: "",
        authorName: "",
        authorDescription: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        imageFile: null,
        category: "",
      });
      setActiveTab(1);
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };

  const updateSinglePost = async (formData) => {
    dispatch(setLoading(true));

    try {
      const data = await updatePost(selectedPost._id, formData);
      dispatch(resetPosts());
      dispatch(
        setNotification({
          type: "success",
          message: data.msg,
        })
      );
      dispatch(setLoading(false));
      // Clear form data
      setFormData({
        title: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        seoSlug: "",
        authorName: "",
        authorDescription: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        category: "",
        imageFile: null,
      });
      setActiveTab(1);
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "imageFile" && formData[key]) {
          data.append("image", formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      });

      if (selectedPost) {
        await updateSinglePost(data);
      } else {
        await createNewPost(data);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoIconClick = () => {
    fileimageref.current.click();
  };
  // const handleDesImage = () => {};
  return (
    <>
      {loading && <Spinner />}
      <Box sx={{ p: 2, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Control
                      interactive={true}
                      onClick={handlePhotoIconClick}
                    >
                      <PhotoAlbumOutlined size="1rem" />
                    </RichTextEditor.Control>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileimageref}
                      onChange={handleImageUpload}
                    />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    {/* <RichTextEditor.H1 /> */}
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    <RichTextEditor.H5 />
                    <RichTextEditor.H6 />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ColorPicker
                    colors={[
                      "#25262b",
                      "#868e96",
                      "#fa5252",
                      "#e64980",
                      "#be4bdb",
                      "#7950f2",
                      "#4c6ef5",
                      "#228be6",
                      "#15aabf",
                      "#12b886",
                      "#40c057",
                      "#82c91e",
                      "#fab005",
                      "#fd7e14",
                    ]}
                  />

                  <RichTextEditor.ControlsGroup>
                    {/* <RichTextEditor.Control interactive={false}>
                      <Colorize size="1rem" />
                    </RichTextEditor.Control> */}
                    <RichTextEditor.Color color="#F03E3E" />
                    <RichTextEditor.Color color="#7048E8" />
                    <RichTextEditor.Color color="#1098AD" />
                    <RichTextEditor.Color color="#37B24D" />
                    <RichTextEditor.Color color="#F59F00" />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.UnsetColor />

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "100%",
                    maxHeight: "220px",
                    scrollbarWidth: "thin",
                    scrollBehavior: "smooth",
                  }}
                  content={formData?.description}
                  fullWidth
                  // label="Description"

                  // value={}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  required
                />
              </RichTextEditor>
              {/* <TextField /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                error={Boolean(errors.category)}
                helperText={errors.category}
                required
              >
                {CONSTANTS.CATEGORIES.map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image"
                name="imageFile"
                value={
                  formData.imageFile
                    ? formData.imageFile.name
                    : existingImageFileName || ""
                }
                onChange={handleChange}
                error={Boolean(errors.imageFile)}
                helperText={errors.imageFile}
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      component="label"
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      Upload
                      <Input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        inputProps={{ accept: "image/*" }}
                        sx={{ display: "none" }}
                      />
                    </Button>
                  ),
                }}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                SEO Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="SEO Title"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="SEO Description"
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="SEO Slug"
                name="seoSlug"
                value={formData.seoSlug}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Author Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Author Name"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                error={Boolean(errors.authorName)}
                helperText={errors.authorName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Author Description"
                name="authorDescription"
                value={formData.authorDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PostForm;
