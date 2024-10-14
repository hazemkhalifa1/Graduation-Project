using System.ComponentModel.DataAnnotations;

namespace Pl.Models
{
    public enum degree
    {
        hard, middle
    }

    public enum type
    {
        decryption, encryption
    }
    public class messageVM
    {
        public IFormFile File { get; set; }
        public degree Degree { get; set; }
        public type Type { get; set; }
        [DataType(DataType.Password), Required(ErrorMessage = "Key Is Required")]
        [MinLength(16)]
        public string key { get; set; }

    }
}
