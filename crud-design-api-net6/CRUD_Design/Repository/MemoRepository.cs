using AutoMapper;
using CRUD_Design.Contracts;

namespace CRUD_Design.Repository
{

    public class MemoRepository: GenericRepository<Memo>, IMemoGenericRepository  {

        private readonly DataContext _context;

        public MemoRepository(DataContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
        }
    }
}
