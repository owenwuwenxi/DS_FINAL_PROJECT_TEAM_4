var app = new Vue ({
  el: '#userProfile',
  data: {
    userName: '',
    userEmail:'',
    userImageLarge:'',
    userImageThumb:'',
    userAge:'',
    userOrigin:'',
    userDOB:''
  },

  created(){
    this.fetchUser();
  },

  methods:{
    formateDate(d) {
      return moment(d).format("dddd, MMMM Do YYYY");
    },
    fetchUser: function(){
      fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        var userData = data.results[0];
        console.log(userData);
        this.userName = userData.name.first + " " + userData.name.last;
        this.userEmail = userData.email;
        this.userAge = userData.dob.age;
        this.userImageLarge = userData.picture.large;
        this.userImageThumb = userData.picture.thumbnail;
        this.userOrigin = userData.location.country;
        this.userDOB = userData.dob.date;
        console.log('user country' + userData.location.country);
      });
      this.newPtForm = this.newPtData();
        },
        handleTriageForm( evt ) {
          console.log("Form submitted!");

          this.triageForm.pt = this.activePt;
          console.log(this.triageForm);

        }
      },
      created() {
        fetch("api/records/")
        .then( response => response.json() )
        .then( json => {
          this.ptList = json;

          console.log(json)}
        );
        this.newPtForm = this.newPtData();
      }
    })
