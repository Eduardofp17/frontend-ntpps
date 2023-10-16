export const errorResponses: Record<string, string> = {
  'Missing roomId': 'É necessário o id da sala para a adição do aluno',
  'Student already exist': 'O aluno já existe em sua sala',
  'Missing name': 'É necessário o nome do estudante para a adição do mesmo',
  'Hour not allowed':
    'A atualização da frequência só é permitida entre as 07:00 e as 17:00',
  'Student_id is required': 'É necessário o id do estudante',
  'Not found': 'O estudante não foi encontrado',
  "You can only update a student's frequency of your room":
    'Você só pode atualizar a frequência de estudantes de sua sala',
  'You must be associate to an school':
    'Você precisa estar vinculado a uma instituição',
  "You don't have permission to update a frequency from a different school.":
    'Você não pode atualizar a frequência de outra escola',
  'Already exist a student with this names in your school':
    'Já existe um estudante com esse nome em sua sala',
};
