package MockProjectBackEnd.Configuration.ErrorResponse;

public class TheValueAlreadyExists extends Exception{

    public TheValueAlreadyExists(String errorMessage){
        super(errorMessage);
    }
}
