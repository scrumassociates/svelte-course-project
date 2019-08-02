<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let meetups = [
    {
      id: "m1",
      title: "My cool meetup 1",
      subtitle: "A really cool subtitle for meetup 1",
      description: "We're gonna have a really good time at meetup 1!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg/1024px-Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg",
      address: "123 Main St., New York, NY 34567",
      contactEmail: "meetup1@meetus.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "My cool meetup 2",
      subtitle: "A really cool subtitle for meetup 2",
      description: "We're gonna have a really good time at meetup 2!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Starbuckscenter.jpg/1024px-Starbuckscenter.jpg",
      address: "456 Main St., New York, NY 34567",
      contactEmail: "meetup2@meetus.com",
      isFavorite: false
    }
  ];

  let editMode;

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button caption="New Meetup" on:click={() => (editMode = 'add')} />
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />

</main>
