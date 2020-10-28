var mcApp = new Vue ({
  el: '#member',
  data: {

    mbrList:[],

    newMbr:{
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
        this.mbrList = json;
        console.log(this.mbrList);
      });
      },

      createdMemberCertification(){
        fetch('api/member/create.php',{
          method:'POST',
          body: JSON.stringify(this.newMbr),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.brList.push(json[0]);
          this.newMbr = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMbr);
    },


    newMbrData(){
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
