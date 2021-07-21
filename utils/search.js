// return length of longest Common Subsequence
function longestCommonSubsequence(s1, s2) {
    const arr1 = [...s1]
    const arr2 = [...s2]
  
    let matrix = [...Array(arr1.length+1)].map(e => Array(arr2.length+1).fill(0))
  
    for(let i = 1; i <= arr1.length; i++) {
        for(let j = 1; j <= arr2.length; j++) {
            if(arr1[i-1] == arr2[j-1]) { matrix[i][j] = matrix[i-1][j] + 1}
            else matrix[i][j] = Math.max(matrix[i-1][j], matrix[i][j-1])
        }
    }
  
    return matrix[matrix.length-1][matrix[0].length-1]
  }

  module.exports = {
      matchScore : (s1,s2)=>{
        let lcs_len = longestCommonSubsequence(s1,s2);
        console.log(`common sub of '${s1.length}' and '${s2}' is ${lcs_len}`);
        return (lcs_len/s1.length + lcs_len/s2.length)/2;
      }
  }