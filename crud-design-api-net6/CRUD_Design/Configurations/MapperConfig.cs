using AutoMapper;
using CRUD_Design.Models;

namespace CRUD_Design.Configurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Memo, CreateMemoDTO>().ReverseMap();
        }
    }
}
