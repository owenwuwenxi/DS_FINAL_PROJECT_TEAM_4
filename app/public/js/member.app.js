var mbrApp = new Vue ({
  el: '#member',
  data: {

    mbrList:[],

    newMbr:{
      firstName:'',
      lastName:'',
      radioNumber:'',
      stationNumber:'',
      preferredEmail:'',
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

      createdMember(){
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
          this.mbrList.push(json[0]);
          this.newMbr = this.newMBRData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMbr);
    },

    deleteMbr(memberID) {
      fetch('api/member/delete.php',{
        method:'POST',
        body: JSON.stringify({"memberID":memberID}),
        headers:{
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        this.mbrList = json;
        //do the right stuff here
    });
    },

    newMBRData(){
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
