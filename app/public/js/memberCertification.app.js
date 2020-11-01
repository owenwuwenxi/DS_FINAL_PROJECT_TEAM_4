var mcApp = new Vue ({
  el: '#memberCertificationVue',
  data: {

    mcList:[],
    certList:[],
    mbrList:[],
    mbrNmcList:[],

    newMC:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:'',
      expired:''
    },
  },


  methods:{
    fetchMemberCertification() {
      fetch('api/memberCertification/')
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        console.log(this.mcList);
      });
      },

    fetchCertification(){
          fetch('api/certifications/')
          .then(response => response.json())
          .then(json => {
            this.certList=json;
            console.log(this.certList);
          });
        },

    fetchmember() {
          fetch('api/member/')
          .then( response => response.json() )
          .then( json => {
            this.mbrList = json;
            console.log(this.mbrList);
          });
          },

     fetchmemberandcertification() {
            fetch('api/member/')
            .then( response => response.json() )
            .then( json => {
              this.mbrNmcList = json;
              console.log(this.mbrNmcList);
            });
            fetch('api/memberCertification/')
            .then( response => response.json() )
            .then( json => {
              this.mbrNmcList += json;
              console.log(this.mbrNmcList);
            });
            fetch('api/certifications/')
            .then(response => response.json())
            .then(json => {
              this.mbrNmcList += json;
              console.log(this.mbrNmcList);
            });
            },

      createMemberCertification(){
        fetch('api/memberCertification/create.php',{
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
    deleteMC(mcID) {
      fetch('api/memberCertification/delete.php',{
        method:'POST',
        body: JSON.stringify({"mcID":mcID}),
        headers:{
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        //do the right stuff here
    });
    },
    newMCData(){
      return {
        memberID:'',
        certificationID:'',
        renewedDate:'',
        expirationDate:'',
        expired:''
      }
    }
  },

      created() {
        this.fetchMemberCertification();
      }
    })
