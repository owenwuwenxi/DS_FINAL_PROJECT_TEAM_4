var mcApp = new Vue ({
  el: '#memberCertification',
  data: {

    mcList:[{
      memberID:'',
      firstName:'',
      lastName:'',
      radioNumber:'',
      stationNumber:'',
      isActive:'',
      address:'',
      preferredEmail:'',
      dob:'',
      startDate:'',
      gender:'',
      dPosition:'',
    }],

    newMC:{
      memberID:'',
      firstName:'',
      lastName:'',
      radioNumber:'',
      stationNumber:'',
      isActive:'',
      address:'',
      preferredEmail:'',
      dob:'',
      startDate:'',
      gender:'',
      dPosition:'',
    },
  },


  methods:{
    fetchmember() {
      fetch('api/member/')
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        console.log(this.mcList);
      });
      },

      createdMemberCertification(){
        fetch('api/member/create.php',{
          method:'POST',
          body: JSON.stringify(this.newMC),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.mcList.push(json[0]);
          this.newMC = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMC);
    },

    newMCData(){
      return {
        memberID:'',
        firstName:'',
        lastName:'',
        radioNumber:'',
        stationNumber:'',
        isActive:'',
        address:'',
        preferredEmail:'',
        dob:'',
        startDate:'',
        gender:'',
        dPosition:'',
      }
    }
  },

      created() {
        this.fetchmember();
      }
    })
