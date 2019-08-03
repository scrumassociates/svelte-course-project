<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let description = "";
  let email = "";
  let imageUrl = "";

  const dispatch = createEventDispatcher();

  function submitForm() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      address: address,
      description: description,
      email: email,
      imageUrl: imageUrl
    });
  }
</script>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<form on:submit|preventDefault={submitForm}>
  <TextInput
    controlType="text"
    id="title"
    label="Title"
    value={title}
    on:input={event => (title = event.target.value)} />
  <TextInput
    controlType="text"
    id="subtitle"
    label="Subtitle"
    value={subtitle}
    on:input={event => (subtitle = event.target.value)} />
  <TextInput
    controlType="text"
    id="address"
    label="Address"
    value={address}
    on:input={event => (address = event.target.value)} />
  <TextInput
    controlType="text"
    id="imageurl"
    label="Image URL"
    value={imageUrl}
    on:input={event => (imageUrl = event.target.value)} />
  <TextInput
    controlType="text"
    id="email"
    label="E-Mail"
    value={email}
    type="email"
    on:input={event => (email = event.target.value)} />
  <TextInput
    controlType="textarea"
    id="description"
    label="Description"
    rows="3"
    value={description}
    on:input={event => (description = event.target.value)} />
  <Button type="submit">Save</Button>
</form>
