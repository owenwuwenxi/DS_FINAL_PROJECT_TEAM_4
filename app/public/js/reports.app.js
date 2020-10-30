var mcApp = new Vue ({
  el: '#reports',
  data: {

    reportList:[],

    newReport:{
      firstName:'',
      lastName:'',
      stationNumber:'',
      radioNumber:'',
      preferredEmail:'',
      certificationName:'',
      expirationDate:'',
      isActive:''
    },
  },


  methods:{
    fetchreports() {
      fetch('api/reports/')
      .then( response => response.json() )
      .then( json => {
        this.reportList = json;
        console.log(this.reportList);
      });
      },

      createdreports(){
        fetch('api/reports/create.php',{
          method:'POST',
          body: JSON.stringify(this.newReport),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.reportList.push(json[0]);
          this.newReport = this.newReportData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newReport);
    },
    deleteMc(report) {
      fetch('api/reports/delete.php',{
        method:'POST',
        body: JSON.stringify({"mcID":mcID}),
        headers:{
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        this.reportList = json;
        //do the right stuff here
    });
    },
    newReportData(){
      return {
        firstName:'',
        lastName:'',
        stationNumber:'',
        radioNumber:'',
        preferredEmail:''
      }
    }
  },

      created() {
        this.fetchreports();
      }
    })
